import dayjs from "dayjs";
import { getClearDate } from "./date";

export function getScheduleOfDate(date: Date, schedules: Record<string, unknown>[]) {
  const result = [];
  for (const schedule of schedules) {
    if (new Date((schedule as any).time) >= getClearDate(date) && new Date((schedule as any).time) <= dayjs(getClearDate(date)).add(1, "day").toDate()) result.push(schedule);
  }
  return result;
}
