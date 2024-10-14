import moment from 'moment-timezone';
import { isCancellable } from './isCancellable';

export const formatAppointmentData = (appointments) => {
  return appointments.map((appointment) => {
    const calendarUrl = generateGoogleCalendarUrl(appointment);

    return {
      id: appointment.id,
      cancellable: isCancellable(appointment),
      date: moment(appointment.date).format('DD.MM.YYYY'),
      start: appointment.range.start.time,
      end: appointment.range.end.time,
      add_to_calendar: calendarUrl,
    };
  });
};

const generateGoogleCalendarUrl = (appointment) => {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Skultes Gym apmeklējums',
  )}&location=${encodeURIComponent('Skultes, Tumes pagasts')}&dates=${encodeURIComponent(
    appointment.date.toISOString().slice(0, 10).replaceAll('-', ''),
  )}T${encodeURIComponent(appointment.range.start.time.replace(':', ''))}00/${encodeURIComponent(
    appointment.date.toISOString().slice(0, 10).replaceAll('-', ''),
  )}T${encodeURIComponent(appointment.range.end.time.replace(':', ''))}00`;
};
