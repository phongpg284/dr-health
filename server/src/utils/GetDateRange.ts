import dayjs from 'dayjs';

/**
 *
 * @param start Start Date
 * @param end End Date
 * @returns Array of Date Range in Date type
 */
export const GetDateRange = (start: any, end: any) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const diff = endDate.diff(startDate, 'days');
  const result = [];
  for (let i = 0; i <= diff; i++) {
    result.push(startDate.add(i, 'day').toDate());
  }
  return result;
};
