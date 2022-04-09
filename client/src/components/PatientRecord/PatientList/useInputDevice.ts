import { useMutation } from "@apollo/client";
import { useState } from "react";
import { PUSH_NEW_DATA} from "./schema";

const useInputDevice = (key: string, initValue: any, deviceId: string) => {
  const [value, setValue] = useState(initValue);
  const [editValue, setEditValue] = useState(false);

  const onChangeValue = (value: any) => {
    setValue(value);
  };

  const [updateDevice] = useMutation(PUSH_NEW_DATA);

  const onCancelEdit = () => {
    setEditValue(false);
  };

  const onConfirmUpdate = () => {
    if (!editValue) setEditValue(true);
    else {
      setEditValue(false);
      const inputs = {
        _id: deviceId,
        [key]: {
          data: value,
        },
      };
      updateDevice({
        variables: {
          inputs: inputs,
        },
      });
    }
  };
  return [value, editValue, onChangeValue, onConfirmUpdate, onCancelEdit];
};

export default useInputDevice;
