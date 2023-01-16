//icon

import { GiMedicines } from "react-icons/gi";

//other

import React from "react";
import { useAppDispatch, useAppSelector } from "app/store";
import { updateMedicineSet } from "app/medicineSlice";
import { DatePicker, Input, InputNumber, TimePicker } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface Medicine {
  name: CheckboxValueType;
  dates: string[];
  hours: string[];
  times: number;
  comment: string;
  quantity: number;
}
interface Card {
  name: CheckboxValueType;
  index: number;
  medicine: Medicine;
}

export const MedicineCard: React.FC<Card> = ({ name, index, medicine }) => {
  const [result, setResult] = React.useState("");
  const [disable, setDisable] = React.useState([false, true, true]);
  const dispatch = useAppDispatch();
  const medicineSet = useAppSelector((state) => state.medicineSet);

  let currentMedicine = medicineSet.medicine[index];
  let comment = "";

  const [times, setTimes] = React.useState(1);

  const commentRef = React.useRef<HTMLInputElement>(null);

  function onHoursChange(arrHours: string[]) {
    if (currentMedicine && medicine) {
      currentMedicine = {
        name: medicine.name,
        dates: medicine.dates,
        hours: arrHours,
        times: times,
        comment: medicine.comment,
        quantity: medicine.quantity,
      };
      const allMedicine: Medicine[] = [];
      medicineSet.medicine.forEach((item) => {
        allMedicine.push(item);
      });
      allMedicine[index] = currentMedicine;
      dispatch(
        updateMedicineSet({
          medicine: allMedicine,
          message: "",
        })
      );
    }
  }

  function onRangeChange(values: any) {
    if (values != null) {
      const days = values.toString().split(",");

      const begin = days[0].split(" ");
      const last = days[1].split(" ");
      const beginDay = begin[0] + "-" + begin[1] + "-" + begin[2];
      const lastDay = last[0] + "-" + last[1] + "-" + last[2];
      if (currentMedicine && medicine) {
        currentMedicine = {
          name: medicine.name,
          dates: days,
          hours: medicine.hours,
          times: medicine.times,
          comment: medicine.comment,
          quantity: medicine.quantity,
        };
        const allMedicine: Medicine[] = [];
        medicineSet.medicine.forEach((item) => {
          allMedicine.push(item);
        });
        allMedicine[index] = currentMedicine;
        dispatch(
          updateMedicineSet({
            medicine: allMedicine,
            message: "",
          })
        );
      }
      setResult(`Bắt đầu: ${beginDay}, Kết thúc: ${lastDay}`);
      setDisable([true, false, true]);
    }
  }
  function onInputAreaChange(value: React.ChangeEvent<HTMLTextAreaElement>) {
    if (value != null) {
      comment = value.target.value;
    }
    if (currentMedicine && medicine) {
      currentMedicine = {
        name: medicine.name,
        dates: medicine.dates,
        hours: medicine.hours,
        times: medicine.times,
        comment: comment,
        quantity: medicine.quantity,
      };
      const allMedicine: Medicine[] = [];
      medicineSet.medicine.forEach((item) => {
        allMedicine.push(item);
      });
      allMedicine[index] = currentMedicine;
      dispatch(
        updateMedicineSet({
          medicine: allMedicine,
          message: "",
        })
      );
    }
  }

  const [quantity, setQunatity] = React.useState(1);
  React.useEffect(() => {
    if (currentMedicine && medicine) {
      currentMedicine = {
        name: medicine.name,
        dates: medicine.dates,
        hours: medicine.hours,
        times: medicine.times,
        comment: comment,
        quantity: quantity,
      };
      const allMedicine: Medicine[] = [];
      medicineSet.medicine.forEach((item) => {
        allMedicine.push(item);
      });
      allMedicine[index] = currentMedicine;
      dispatch(
        updateMedicineSet({
          medicine: allMedicine,
          message: "",
        })
      );
    }
  }, [quantity]);
  function onQuantityChange(q: number) {
    setQunatity(q);
  }
  function onNumberChange(value: number) {
    setTimes(value);
  }

  return (
    <>
      <div className="calendarDateItem">
        <div className="dataPicker">
          <div className="medicineTitle">
            <span className="calendar_set_date_item">
              <GiMedicines />
            </span>
            <div className="name">{name}</div>
          </div>

          <div className="pickerItem">
            <label>Thời gian dùng thuốc</label>
            <RangePicker onChange={onRangeChange} className="calendar_range_picker_item calendar_rounded" />
          </div>
          <div className="pickerItem">
            <label>Số lần uống 1 ngày</label>
            <InputNumber min={1} max={10} defaultValue={1} onChange={onNumberChange} className="calendar_number_picker_item calendar_rounded" />
          </div>
          <div className="pickerItem">
            <label>Số lượng (viên)</label>
            <InputNumber min={1} value={quantity} onChange={onQuantityChange} className="calendar_number_picker_item calendar_rounded" />
          </div>
          <MyTimesPicker onChange={onHoursChange} times={times} />
        </div>
        <div className="calendarRow">
          <TextArea rows={2} placeholder="Cách dùng thuốc" className="note" onBlur={onInputAreaChange} ref={commentRef} />
        </div>
      </div>
    </>
  );
};

interface MyTimesPickerProps {
  times: number;
  onChange?: (values: string[]) => void;
}
function MyTimesPicker(props: MyTimesPickerProps) {
  const { times, onChange } = props;

  const [arrHours, setArrHours] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (times > arrHours.length) {
      const newArr = new Array(times - arrHours.length).fill(defaultDate.toString());
      setArrHours(arrHours.concat(newArr));
    } else if (times < arrHours.length) {
      setArrHours(arrHours.slice(0, times));
    }
  }, [times, arrHours]);

  function onHoursChange(value: dayjs.Dayjs | null, index: number) {
    const newTime = value ? value.toString() : "";
    const newArr = [...arrHours];
    newArr[index] = newTime;
    setArrHours(newArr);
  }

  React.useEffect(() => {
    if (onChange) {
      onChange(arrHours);
    }
  }, [arrHours]);
  return (
    <>
      {arrHours.map((hour, index) => (
        <div className="pickerItem" key={index}>
          <label className="label">Lần {index + 1}</label>
          <TimePicker defaultValue={dayjs(defaultDate.toISOString())} key={index} onChange={(value) => onHoursChange(value, index)} className="pickerInput" />
        </div>
      ))}
    </>
  );
}

const defaultDate = new Date();
defaultDate.setHours(8, 0, 0, 0);
