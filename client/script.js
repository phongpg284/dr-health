import fs from "fs";
import fetch from "node-fetch";
import dayjs from "dayjs";

let rawdata = fs.readFileSync("data.json");
let student = JSON.parse(rawdata);

const { SpO2, heartRate, bodyTemp, diastole, systolic } = student;

const saveData = async () => {
  for (const element of SpO2) {
    console.log({
      type: "spO2",
      unit: "%",
      value: element.data,
      patientId: 3,
      createdAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
      updatedAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
    });
    const res = await fetch("http://localhost:5000/api/medical-stat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "spO2",
        unit: "%",
        value: element.data,
        patientId: 3,
        createdAt: dayjs(element.createdAt.$date).add(3, "month").add(13, "day").toDate(),
        updatedAt: dayjs(element.createdAt.$date).add(3, "month").add(13, "day").toDate(),
      }),
    }).then((res) => res.json());
    console.log(res);
  }

  for (const element of heartRate) {
    console.log({
      type: "heart_rate",
      unit: "bpm",
      value: element.data,
      patientId: 3,
      createdAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
      updatedAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
    });
    const res = await fetch("http://localhost:5000/api/medical-stat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "heart_rate",
        unit: "bpm",
        value: element.data,
        patientId: 3,
        createdAt: dayjs(element.createdAt.$date).add(3, "month").add(13, "day").toDate(),
        updatedAt: dayjs(element.createdAt.$date).add(3, "month").add(13, "day").toDate(),
      }),
    }).then((res) => res.json());
    console.log(res);
  }
  for (const element of bodyTemp) {
    console.log({
      type: "body_temp",
      unit: "C",
      value: element.data,
      patientId: 3,
      createdAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
      updatedAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
    });
    const res = await fetch("http://localhost:5000/api/medical-stat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "body_temp",
        unit: "C",
        value: element.data,
        patientId: 3,
        createdAt: dayjs(element.createdAt.$date).add(3, "month").add(13, "day").toDate(),
        updatedAt: dayjs(element.createdAt.$date).add(3, "month").add(13, "day").toDate(),
      }),
    }).then((res) => res.json());
    console.log(res);
  }
  for (const [index, element] of diastole.entries()) {
    console.log({
      type: "blood_press",
      unit: "bpm",
      value: element.data,
      secondValue: systolic[index].data,
      patientId: 3,
      createdAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
      updatedAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
    });
    const res = await fetch("http://localhost:5000/api/medical-stat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "blood_press",
        unit: "bpm",
        value: element.data,
        secondValue: systolic[index].data,
        patientId: 3,
        createdAt: dayjs(element.createdAt.$date).add(3, "month").add(13, "day").toDate(),
        updatedAt: dayjs(element.createdAt.$date).add(3, "month").add(13, "day").toDate(),
      }),
    }).then((res) => res.json());
    console.log(res);
  }
};
saveData();
