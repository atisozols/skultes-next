import { NextResponse } from 'next/server';
import moment from 'moment';
import mongoose from 'mongoose'; // <-- IMPORTANT: import mongoose for transactions
import stripePackage from 'stripe';
import dbConnect from '@/utils/dbConnect';
import Appointment from '@/models/Appointment';
import timeSlots from '@/utils/book/timeSlots';
import calculatePricing from '@/utils/pricing/calculatePricing';

const stripe = stripePackage(process.env.STRIPE_KEY);

export async function POST(request) {
  await dbConnect();

  let appointmentsData;
  try {
    appointmentsData = await request.json();
  } catch (error) {
    return NextResponse.json({ msg: 'Invalid JSON body' }, { status: 400 });
  }

  // Build the cart in memory
  const cart = [];
  for (const appointment of appointmentsData) {
    const price = calculatePricing(
      appointment.start_index,
      appointment.end_index,
      appointment.date,
    );

    if (!price) {
      return NextResponse.json(
        { msg: 'Bad request: No pricing available for this timeslot range!' },
        { status: 400 },
      );
    }

    cart.push({
      name: appointment.name,
      phone: appointment.phone,
      date: appointment.date,
      range: {
        start: {
          index: appointment.start_index,
          time: timeSlots[appointment.start_index],
        },
        end: {
          index: appointment.end_index,
          time: timeSlots[appointment.end_index],
        },
      },
      price,
    });
  }

  // Prepare line items for Stripe
  const lineItems = [];
  let totalPrice = 0;
  for (const appointment of cart) {
    totalPrice += appointment.price;
    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Skultes Gym rezervācija',
          description: `${appointment.date} ${appointment.range.start.time} - ${appointment.range.end.time}`,
        },
        unit_amount: appointment.price,
      },
      quantity: 1,
    });
  }

  // Create the Stripe checkout session outside the transaction
  // (You can also do it inside the transaction, but be aware that Stripe won't "rollback" if the transaction fails.)
  const currentTime = Date.now();
  const thirtyMinutesFromNow = currentTime + 30 * 60 * 1000;
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONT_URL}/order/{CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.FRONT_URL,
      expires_at: Math.floor(thirtyMinutesFromNow / 1000),
      allow_promotion_codes: true,
    });
  } catch (err) {
    console.error('Error creating Stripe session:', err);
    return NextResponse.json({ msg: 'Failed to create Stripe session' }, { status: 500 });
  }

  // Start a MongoDB session for the transaction
  const mongoSession = await mongoose.startSession();
  try {
    // Wrap DB operations in a transaction
    await mongoSession.withTransaction(async () => {
      // Re-check for conflicts inside the transaction
      for (const appointment of cart) {
        const inputStart = moment(appointment.date).startOf('day').toDate();
        const inputEnd = moment(appointment.date).endOf('day').toDate();

        const conflicts = await Appointment.find({
          date: { $gte: inputStart, $lte: inputEnd },
          status: { $in: ['paid', 'cart'] },
          $or: [
            {
              'range.start.index': { $lt: appointment.range.end.index },
              'range.end.index': { $gt: appointment.range.start.index },
            },
            {
              $and: [
                {
                  'range.start.index': {
                    $gte: appointment.range.start.index,
                    $lt: appointment.range.end.index,
                  },
                },
                { 'range.end.index': { $gt: appointment.range.end.index } },
              ],
            },
            {
              $and: [
                { 'range.start.index': { $lt: appointment.range.start.index } },
                {
                  'range.end.index': {
                    $gt: appointment.range.start.index,
                    $lte: appointment.range.end.index,
                  },
                },
              ],
            },
          ],
        }).session(mongoSession);

        if (conflicts.length > 0) {
          // If any conflicts are found, throw an error to abort the transaction
          throw new Error('ConflictFound');
        }
      }

      // If no conflicts, proceed to insert the "cart" appointments
      const appointmentsToInsert = cart.map((appointment) => ({
        ...appointment,
        checkout: session.id,
        status: 'cart',
      }));

      await Appointment.insertMany(appointmentsToInsert, { session: mongoSession });
    });

    // If we make it here, the transaction was committed successfully
    console.log('Transaction committed, appointments inserted!');
    mongoSession.endSession();
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    // If an error is thrown in the transaction, it's rolled back
    console.error('Transaction error:', error);
    await mongoSession.endSession();

    if (error.message === 'ConflictFound') {
      // Return 409 conflict message
      return NextResponse.json(
        {
          msg: 'Kāds no izvēlētajiem laikiem jau ticis rezervēts vai šobrīd tiek apstrādāts!',
        },
        { status: 409 },
      );
    }

    // Otherwise, it's an internal server error
    return NextResponse.json({ msg: 'Internal server error' }, { status: 500 });
  }
}
