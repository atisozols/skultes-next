import { NextResponse } from 'next/server';
import stripePackage from 'stripe';
import dbConnect from '@/utils/dbConnect';
import Appointment from '@/models/Appointment';
import eventController from '@/utils/eventController';

// Initialize Stripe
const stripe = stripePackage(process.env.STRIPE_KEY);

// IMPORTANT: Remove the old config that set bodyParser: false
// export const config = {
//   api: {
//     bodyParser: false, // (No longer needed in the App Router)
//   },
// };

export async function POST(request) {
  await dbConnect();

  // 1. Get Stripe signature from headers
  const sig = request.headers.get('stripe-signature');
  const key = process.env.STRIPE_WEBHOOK;

  // 2. Read the raw body using arrayBuffer()
  let rawBody;
  try {
    const buffer = await request.arrayBuffer();
    rawBody = Buffer.from(buffer);
  } catch (err) {
    return NextResponse.json({ msg: 'Error reading request body' }, { status: 400 });
  }

  // 3. Construct Stripe event
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, key);
  } catch (err) {
    return NextResponse.json({ msg: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // 4. Handle event types
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

  // Always return 200 to acknowledge receipt
  return NextResponse.json({ received: true }, { status: 200 });
}
