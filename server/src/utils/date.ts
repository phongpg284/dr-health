import * as dayjs from 'dayjs';

export const getDateRange = (startDate: string | Date, endDate: string | Date) => {
  const result = [];
  let start = dayjs(startDate);
  const end = dayjs(endDate);
  while (start <= end) {
    result.push(start.toDate());
    start = start.add(1, 'day');
  }
  return result;
};

export const combineDateAndTime = (dateString, timeString) => {
  const date = dayjs(dateString);
  const time = dayjs(timeString);
  const year = date.year();
  const month = date.month();
  const day = date.date();
  const hour = time.hour();
  const minute = time.minute();
  const second = time.second();

  const result = new Date(year, month, day, hour, minute, second);
  return result;
};
