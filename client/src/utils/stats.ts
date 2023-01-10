import { MedicalStat } from "common/types";
import dayjs from "dayjs";
import { getDateOfWeek } from "./date";

export const calculateStat = (type: "Ngày" | "Tháng" | "Tuần", data: MedicalStat[], startDay: Date, isMultipleValue?: boolean) => {
  const arr: Record<string, string[]> = {};
  const secondArr: Record<string, string[]> = {};
  let start = 0;
  if (type === "Ngày") {
    const maxRange = 24;
    const startDate = dayjs(startDay).startOf("d").toDate();
    for (let i = 0; i < maxRange; i++) {
      if (!arr[i]) arr[i] = [];
      if (!secondArr[i]) secondArr[i] = [];
      while (start < data.length && dayjs(data[start].createdAt) < dayjs(startDate).add(i + 1, "hour")) {
        if (dayjs(data[start].createdAt) >= dayjs(startDate).add(i, "hour")) {
          arr[i] = [...arr[i], data[start].value];
          if (isMultipleValue) secondArr[i] = [...secondArr[i], data[start].secondValue as string];
        }
        start += 1;
      }
    }
    const avg: number[] = [];
    const secondAvg: number[] = [];
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

    if (isMultipleValue) {
      Object.values(secondArr).forEach((value) => {
        const average = Math.floor((value.reduce((prev, curr) => prev + parseFloat(curr), 0) / value.length) * 10) / 10;
        secondAvg.push(average);
      });
      return {
        data: [avg, secondAvg],
        label: label,
      };
    }
    return {
      data: avg,
      label: label,
    };
  } else if (type === "Tháng") {
    const startDate = dayjs(startDay).startOf("M").toDate();
    const maxRange = dayjs(startDate).daysInMonth();
    for (let i = 0; i < maxRange; i++) {
      if (!arr[i]) arr[i] = [];
      if (!secondArr[i]) secondArr[i] = [];
      while (start < data.length && dayjs(data[start].createdAt) < dayjs(startDate).add(i + 1, "day")) {
        if (dayjs(data[start].createdAt) >= dayjs(startDate).add(i, "day")) {
          arr[i] = [...arr[i], data[start].value];
          if (isMultipleValue) secondArr[i] = [...secondArr[i], data[start].secondValue as string];
        }
        start += 1;
      }
    }
    const avg: number[] = [];
    const secondAvg: number[] = [];
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
    if (isMultipleValue) {
      Object.values(secondArr).forEach((value) => {
        const average = Math.floor((value.reduce((prev, curr) => prev + parseFloat(curr), 0) / value.length) * 10) / 10;
        secondAvg.push(average);
      });
      return {
        data: [avg, secondAvg],
        label: label,
      };
    }
    return {
      data: avg,
      label: label,
    };
  } else if (type === "Tuần") {
    const startDate = dayjs(startDay).startOf("w").toDate();
    const maxRange = 7;
    for (let i = 0; i < maxRange; i++) {
      if (!arr[i]) arr[i] = [];
      if (!secondArr[i]) secondArr[i] = [];
      while (start < data.length && dayjs(data[start].createdAt) < dayjs(startDate).add(i + 1, "day")) {
        if (dayjs(data[start].createdAt) >= dayjs(startDate).add(i, "day")) {
          arr[i] = [...arr[i], data[start].value];
          if (isMultipleValue) secondArr[i] = [...secondArr[i], data[start].secondValue as string];
        }
        start += 1;
      }
    }
    const avg: number[] = [];
    const secondAvg: number[] = [];
    const label: string[] = [];
    Object.entries(arr).forEach(([key, value]) => {
      const average = Math.floor((value.reduce((prev, curr) => prev + parseFloat(curr), 0) / value.length) * 10) / 10;
      avg.push(average);
      label.push(
        dayjs(startDate)
          .add(+key, "day")
          .format("DD/MM") +
        ", " +
        getDateOfWeek(dayjs(startDate).add(+key, "day"))
      );
    });
    if (isMultipleValue) {
      Object.values(secondArr).forEach((value) => {
        const average = Math.floor((value.reduce((prev, curr) => prev + parseFloat(curr), 0) / value.length) * 10) / 10;
        secondAvg.push(average);
      });
      return {
        data: [avg, secondAvg],
        label: label,
      };
    }
    return {
      data: avg,
      label: label,
    };
  }
};
