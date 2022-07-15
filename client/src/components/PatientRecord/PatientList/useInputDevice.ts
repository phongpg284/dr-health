import { useState } from "react";
import { useApi } from "utils/api";

const useInputDevice = (key: string, initValue: any, deviceId: string) => {
  const [value, setValue] = useState(initValue);
  const [editValue, setEditValue] = useState(false);
  const api = useApi();

  const onChangeValue = (value: any) => {
    setValue(value);
  };

  const onCancelEdit = () => {
    setEditValue(false);
  };

  const onConfirmUpdate = () => {
    if (!editValue) setEditValue(true);
    else {
      setEditValue(false);
      const inputs = {
        [key]: {
          data: value,
        },
      };
      api.post(`/device/${deviceId}`, inputs);
    }
  };
  return [value, editValue, onChangeValue, onConfirmUpdate, onCancelEdit];
};

export default useInputDevice;
