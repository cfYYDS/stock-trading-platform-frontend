import moment from 'moment-timezone';

export default function formatDate(date) {
  const timeZone = moment.tz.guess();
  const temp = moment(date).tz(timeZone);
  return `${temp.format('z')}: ${temp.format('YYYY-MM-DD')}`;
}
