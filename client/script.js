import fs from "fs";
import fetch from "node-fetch";
import dayjs from "dayjs";

let rawdata = fs.readFileSync("data.json");
let student = JSON.parse(rawdata);

student.SpO2.forEach(async (element) => {
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
      createdAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
      updatedAt: dayjs(element.createdAt.$date).add(6, "month").toDate(),
    }),
  }).then((res) => res.json());
  console.log(res);
});
