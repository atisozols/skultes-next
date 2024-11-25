import moment from 'moment-timezone'; // Use moment-timezone for proper timezone handling

export const isCancellable = (appointment) => {
  const createdAt = moment(appointment.created_at).tz('Europe/Riga').utc(true);
  const appointmentTime = moment(appointment.date);

  appointmentTime
    .set('hour', appointment.range.start.time.split(':')[0])
    .set('minute', appointment.range.start.time.split(':')[1])
    .tz('Europe/Riga')
    .utc(true);

  const timeDifference = moment.duration(appointmentTime.diff(createdAt));

  const fiveMinutesLater = createdAt.add(5, 'minutes');
  const currentTime = moment().tz('Europe/Riga').utc(true);

  const cancellableUntil =
    timeDifference.asHours() > 12 ? appointmentTime.add(-12, 'hours') : fiveMinutesLater;

  return currentTime.isBefore(cancellableUntil);
};
