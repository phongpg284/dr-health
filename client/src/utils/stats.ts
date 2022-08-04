import { MedicalStat } from "common/types";
import dayjs from "dayjs";

export const calculateStat = (type: "Ngày" | "Tháng" | "Tuần", data: MedicalStat[], startDay: Date) => {
  const arr: Record<string, string[]> = {};
  let start = 0;
  if (type === "Ngày") {
    const maxRange = 24;
    const startDate = dayjs(startDay).startOf("d").toDate();
    for (let i = 0; i < maxRange; i++) {
      if (!arr[i]) arr[i] = [];
      while (start < data.length && dayjs(data[start].createdAt) < dayjs(startDate).add(i + 1, "hour")) {
        if (dayjs(data[start].createdAt) >= dayjs(startDate).add(i, "hour")) {
          arr[i] = [...arr[i], data[start].value];
        }
        start += 1;
      }
    }
    const avg: number[] = [];
    const label: string[] = [];
    Object.entries(arr).forEach(([key, value]) => {
      const average = Math.floor((value.reduce((prev, curr) => prev + parseFloat(curr), 0) / value.length) * 10) / 10;
      avg.push(average);
      label.push(
        dayjs(startDate)
          .add(+key, "hour")
          .format("HH:mm")
      );
    });
    return {
      data: avg,
      label: label,
    };
  } else if (type === "Tháng") {
    const startDate = dayjs(startDay).startOf("M").toDate();
    const maxRange = dayjs(startDate).daysInMonth();
    for (let i = 0; i < maxRange; i++) {
      if (!arr[i]) arr[i] = [];
      while (start < data.length && dayjs(data[start].createdAt) < dayjs(startDate).add(i + 1, "day")) {
        if (dayjs(data[start].createdAt) >= dayjs(startDate).add(i, "day")) {
          arr[i] = [...arr[i], data[start].value];
        }
        start += 1;
      }
    }
    const avg: number[] = [];
    const label: string[] = [];
    Object.entries(arr).forEach(([key, value]) => {
      const average = Math.floor((value.reduce((prev, curr) => prev + parseFloat(curr), 0) / value.length) * 10) / 10;
      avg.push(average);
      label.push(
        dayjs(startDate)
          .add(+key, "day")
          .format("DD/MM")
      );
    });
    return {
      data: avg,
      label: label,
    };
  } else if (type === "Tuần") {
    const startDate = dayjs(startDay).startOf("w").toDate();
    const maxRange = 7;
    for (let i = 0; i < maxRange; i++) {
      if (!arr[i]) arr[i] = [];
      while (start < data.length && dayjs(data[start].createdAt) < dayjs(startDate).add(i + 1, "day")) {
        if (dayjs(data[start].createdAt) >= dayjs(startDate).add(i, "day")) {
          arr[i] = [...arr[i], data[start].value];
        }
        start += 1;
      }
    }
    const avg: number[] = [];
    const label: string[] = [];
    Object.entries(arr).forEach(([key, value]) => {
      const average = Math.floor((value.reduce((prev, curr) => prev + parseFloat(curr), 0) / value.length) * 10) / 10;
      avg.push(average);
      label.push(
        dayjs(startDate)
          .add(+key, "day")
          .format("DD/MM")
      );
    });
    return {
      data: avg,
      label: label,
    };
  }
};
