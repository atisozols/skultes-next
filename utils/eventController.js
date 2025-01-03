/* eslint-disable indent */
import { google } from 'googleapis';

const jwtClient = new google.auth.JWT(process.env.GOOGLE_USER, null, process.env.GOOGLE_KEY, [
  'https://www.googleapis.com/auth/calendar',
]);

const calendarInstance = google.calendar({ version: 'v3', auth: jwtClient });

// Function to add an event to Google Calendar
const addEventToCalendar = (appointment, calendar) => {
  const eventDetails = {
    // eslint-disable-next-line no-underscore-dangle
    id: appointment._id,
    summary: appointment.name,
    colorId: '3',
    description: appointment.phone,
    start: {
      dateTime: `${appointment.date.toISOString().slice(0, 10)}T${appointment.range.start.time}:00`,
      timeZone: 'Europe/Riga',
    },
    end:
      appointment.range.end.time === '00:00'
        ? {
            dateTime: `${appointment.date.toISOString().slice(0, 10)}T23:59:00`,
            timeZone: 'Europe/Riga',
          }
        : {
            dateTime: `${appointment.date.toISOString().slice(0, 10)}T${
              appointment.range.end.time
            }:00`,
            timeZone: 'Europe/Riga',
          },
  };

  try {
    const response = calendar.events.insert({
      calendarId: process.env.CALENDAR_ID,
      resource: eventDetails,
    });

    return response;
  } catch (error) {
    console.error('Error adding event: ', error);
  }
};

const removeEventFromCalendar = (appointment, calendar) => {
  try {
    const response = calendar.events.delete({
      calendarId: process.env.CALENDAR_ID,
      eventId: appointment.id,
    });

    return response;
  } catch (error) {
    console.error('Error deleting event: ', error);
  }
};

module.exports = {
  addEventToCalendar,
  removeEventFromCalendar,
  calendarInstance,
};
