import dayjs from 'dayjs';

export const formattedDate = (date: string) => {
  const formattedDate = dayjs(date).format('YYYY/MM/DD');
  return formattedDate
}
export const formattedDateJa = (date: string) => {
  const formattedDate = dayjs(date).format('YYYY年MM月DD日');
  return formattedDate
}

export const formattedDateTime = (date: string) => {
  const formattedDateTime = dayjs(date).format('YYYY/M/D HH:mm');
  return formattedDateTime;
}