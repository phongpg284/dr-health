import fetch from "node-fetch";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";

faker.locale = "vi";

const saveData = async () => {
  for (let i = 2; i < 200; i++) {
    const id = Math.floor(i / 10) + 1;
    const patient_id = i;
    console.log(id, patient_id);
    const res = await fetch(`https://dr-health.com.vn/api/device`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `device${i}`,
        type: 'medical',
        isConnect: false,
        code: 
      })
    }).then((res) => res.text());
    console.log(res);
  }
};
saveData();
