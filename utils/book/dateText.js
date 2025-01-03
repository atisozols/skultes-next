import moment from 'moment-timezone';

const dateText = (date) => {
  return moment.tz(date, 'Europe/Riga').format('DD.MM');
};

export default dateText;
