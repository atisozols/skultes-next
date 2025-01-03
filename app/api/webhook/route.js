import { NextResponse } from 'next/server';
import stripePackage from 'stripe';
import dbConnect from '@/utils/dbConnect';
import Appointment from '@/models/Appointment';
import eventController from '@/utils/eventController';

const stripe = stripePackage(process.env.STRIPE_KEY);

export const config = {
  api: {
    bodyParser: false, // We need the raw body for Stripe webhooks
  },
};

export async function POST(request) {
  await dbConnect();

  const sig = request.headers.get('stripe-signature');
  const key = process.env.STRIPE_WEBHOOK;

  let rawBody;
  try {
    const buffer = await request.arrayBuffer();
    rawBody = Buffer.from(buffer);
  } catch (err) {
    return NextResponse.json({ msg: 'Error reading request body' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, key);
  } catch (err) {
    return NextResponse.json({ msg: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      console.log('Session', session.id, 'async payment failed');

      try {
        const result = await Appointment.deleteMany({
          checkout: session.id,
          status: 'cart',
        });
        console.log(`${result.deletedCount} deleted`);
      } catch (error) {
        console.error('Error deleting appointments:', error);
      }

      break;
    }

    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object;
      console.log('Session', session.id, 'async payment succeeded');

      try {
        const result = await Appointment.updateMany(
          { checkout: session.id },
          { $set: { status: 'paid' } },
        );

        const appointments = await Appointment.find({ checkout: session.id });

        for (const appointment of appointments) {
          await eventController.addEventToCalendar(appointment, eventController.calendarInstance);
          console.log(`Event created for ${appointment.name}`);
        }

        if (result.modifiedCount === 0) {
          console.error('No appointments found for the given ID');
        }

        console.log(`${result.modifiedCount} updated to status: paid`);
      } catch (error) {
        console.error('Error updating appointments:', error);
      }

      break;
    }

    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('Session', session.id, 'completed');

      try {
        const result = await Appointment.updateMany(
          { checkout: session.id },
          { $set: { status: 'paid' } },
        );

        const appointments = await Appointment.find({ checkout: session.id });

        for (const appointment of appointments) {
          const calEvent = await eventController.addEventToCalendar(
            appointment,
            eventController.calendarInstance,
          );
          console.log(`Event created for ${appointment.name}`);
          console.log(calEvent);
        }

        if (result.modifiedCount === 0) {
          console.error('No appointments found for the given ID');
        }

        console.log(`${result.modifiedCount} updated to status: paid`);
      } catch (error) {
        console.error('Error updating appointments:', error);
      }

      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      console.log('Session', session.id, 'expired');

      try {
        const result = await Appointment.deleteMany({
          checkout: session.id,
          status: 'cart',
        });
        console.log(`${result.deletedCount} deleted`);
      } catch (error) {
        console.error('Error deleting appointments:', error);
      }

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
