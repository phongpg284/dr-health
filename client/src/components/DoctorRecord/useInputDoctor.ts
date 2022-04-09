import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_DOCTOR } from "./schema";
import dayjs from "dayjs"

const useInputDoctor = (key: string, initValue: any, doctorId: string) => {
  const [value, setValue] = useState(initValue);
  const [editValue, setEditValue] = useState(false);

  const onChangeValue = (e: any) => {
    setValue(e?.target?.value);
  };

  const onChangeDate = (date: any, dateString: string) => {
    setValue(dayjs(dateString, "DD/MM/YYYY"));
  }

  const [updateDoctor] = useMutation(UPDATE_DOCTOR);

  const onConfirmUpdate = () => {
    if (!editValue) setEditValue(true);
    else {
      setEditValue(false);
      let inputs;
      if (key === "age")
        inputs = {
          _id: doctorId,
          [key]: parseFloat(value),
        };
      else
        inputs = {
          _id: doctorId,
          [key]: value,
        };
      updateDoctor({
        variables: {
          inputs: inputs,
        },
      });
    }
  };
  if(key=== "birth")
  return [value, editValue, onChangeDate, onConfirmUpdate];

  return [value, editValue, onChangeValue, onConfirmUpdate];
};

export default useInputDoctor;
