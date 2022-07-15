import { useState } from "react";
import dayjs from "dayjs";
import { useApi } from "utils/api";

const useInputDoctor = (key: string, initValue: any, doctorId: string) => {
  const [value, setValue] = useState(initValue);
  const [editValue, setEditValue] = useState(false);

  const onChangeValue = (e: any) => {
    setValue(e?.target?.value);
  };

  const onChangeDate = (date: any, dateString: string) => {
    setValue(dayjs(dateString, "DD/MM/YYYY"));
  };

  const api = useApi();
  const onConfirmUpdate = () => {
    if (!editValue) setEditValue(true);
    else {
      setEditValue(false);
      let inputs;
      if (key === "age")
        inputs = {
          [key]: parseFloat(value),
        };
      else
        inputs = {
          [key]: value,
        };
      api.post(`/doctor/${doctorId}`, inputs);
    }
  };
  if (key === "birth") return [value, editValue, onChangeDate, onConfirmUpdate];

  return [value, editValue, onChangeValue, onConfirmUpdate];
};

export default useInputDoctor;
