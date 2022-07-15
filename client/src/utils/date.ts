type DateType = Date | string | number;

export const differenceInYears = (date: Date | string): number => {
  const dateDiff = new Date().getTime() - new Date(date).getTime();
  return new Date(dateDiff).getUTCFullYear() - 1970;
};

export const MmDdSwitch = (date: string): string => {
  if (!date) return "";
  let formatted_date = "";
  if (date.indexOf("/") >= 0) {
    const [mm, dd, yyyy] = date.split("/");
    formatted_date = `${dd}/${mm}/${yyyy}`;
  }
  return formatted_date;
};

const timeDifference = (date: DateType, conversion = 1) => {
  const dateDiff = new Date().getTime() - new Date(date).getTime();
  return Math.floor(dateDiff / conversion);
};

export const differenceInWeeks = (date: DateType): number => timeDifference(date, 1000 * 60 * 60 * 24 * 7);
export const differenceInDays = (date: DateType): number => timeDifference(date, 1000 * 60 * 60 * 24);
export const differenceInMinutes = (date: DateType): number => timeDifference(date, 1000 * 60);

export const isPast = (date: DateType): boolean => timeDifference(date) > 0;
export const isValid = (date: DateType): boolean => {
  const dateObj = new Date(date);
  // eslint-disable-next-line no-restricted-globals
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};
export const addMinutes = (date: DateType, minutes: number): number => new Date(date).getTime() + 1000 * 60 * minutes;

export const format = (date: DateType, formatObj: Intl.DateTimeFormatOptions = {}): string => new Intl.DateTimeFormat("en-us", formatObj).format(new Date(date));

export const formatToParts = (date: DateType, formatObj: Intl.DateTimeFormatOptions = {}): Partial<Record<Intl.DateTimeFormatPartTypes, string>> =>
  new Intl.DateTimeFormat("en-us", formatObj).formatToParts(new Date(date)).reduce(
    (acc, part) => ({
      ...acc,
      [part.type]: part.value,
    }),
    {}
  );
