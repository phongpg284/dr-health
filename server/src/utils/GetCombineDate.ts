import dayjs from 'dayjs';
/**
 *
 * @param dates Date
 * @param hours Hour
 * @returns Combine date from Date and Hour
 */
export const GetCombineDate = (date: Date, hour: Date) => {
  const dayjsDate = dayjs(date);
  const dayjsHour = dayjs(hour);
  const combineDate = dayjs(
    new Date(
      dayjsDate.get('year'),
      dayjsDate.get('month'),
      dayjsDate.get('date'),
      dayjsHour.get('hour'),
      dayjsHour.get('minute'),
      dayjsHour.get('second')
    )
  );
  return combineDate;
};
