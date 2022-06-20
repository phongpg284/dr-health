import { useState } from "react";
import dayjs from "dayjs";
import { useApi } from "utils/api";

const useInput = (key: string, initValue: any, patientId: string) => {
    const api = useApi();
    const [value, setValue] = useState(initValue);
    const [editValue, setEditValue] = useState(false);

    const onChangeValue = (e: any) => {
        setValue(e?.target?.value);
    };

    const onChangeDate = (date: any, dateString: string) => {
        setValue(dayjs(dateString, "DD/MM/YYYY"));
    };

    
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
            api.post(`/patient/${patientId}`, inputs)
            .then((res)=>{

                console.log("patient success",res)
            }).catch((err)=>{
                console.log(" patient error",err)
            })
        }
    };
    const onCancelUpdate = () => {
        setEditValue(false);
    };
    if (key === "birth") return [value, editValue, onChangeDate, onConfirmUpdate, onCancelUpdate];

    return [value, editValue, onChangeValue, onConfirmUpdate, onCancelUpdate];
};

export default useInput;
