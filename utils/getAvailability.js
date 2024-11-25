import moment from 'moment-timezone';
import dbConnect from './dbConnect'; // Add your DB connection logic here
import Appointment from '../models/Appointment'; // Adjust path based on your project structure

export const getAvailability = async () => {
  try {
    const currentDay = moment().tz('Europe/Riga').startOf('day').utc(true);

    // Define the 14-day range
    const fourteenDaysDates = [];
    for (let i = 0; i < 14; i += 1) {
      const date = moment(currentDay).add(i, 'days');
      fourteenDaysDates.push(date.startOf('day').toDate());
    }

    // Connect to the database
    await dbConnect();

    // Fetch availability data from the database
    const unavailableRanges = await Appointment.aggregate([
      {
        $match: {
          date: { $gte: currentDay.toDate() },
          status: 'paid',
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
          },
          ranges: { $push: '$range' },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: '$_id.year',
              month: '$_id.month',
              day: '$_id.day',
            },
          },
          ranges: 1,
        },
      },
    ]);

    // Create a map for quick lookup of appointment dates
    const appointmentDatesMap = new Map();
    unavailableRanges.forEach(({ date, ranges }) => {
      appointmentDatesMap.set(moment(date).startOf('day').toDate().toISOString(), { date, ranges });
    });

    // Create availability for the 14-day range
    const availability = fourteenDaysDates.map((date) => {
      const isoDate = moment(date).startOf('day').toDate().toISOString();
      return {
        date,
        ranges: appointmentDatesMap.has(isoDate) ? appointmentDatesMap.get(isoDate).ranges : [],
      };
    });

    // Append any additional future dates with appointments
    const additionalDates = Array.from(appointmentDatesMap.values()).filter(({ date }) =>
      moment(date).isAfter(moment(fourteenDaysDates[13])),
    );

    // Combine the 14-day data with additional dates
    const combinedAvailability = [...availability, ...additionalDates];

    return combinedAvailability;
  } catch (error) {
    console.error('Error fetching availability:', error);
    throw new Error('Failed to fetch availability.');
  }
};
