import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_PATIENT } from "./schema";
import dayjs from "dayjs";

const useInput = (key: string, initValue: any, patientId: string) => {
    const [value, setValue] = useState(initValue);
    const [editValue, setEditValue] = useState(false);

    const onChangeValue = (e: any) => {
        setValue(e?.target?.value);
    };

    const onChangeDate = (date: any, dateString: string) => {
        setValue(dayjs(dateString, "DD/MM/YYYY"));
    };

    const [updatePatient] = useMutation(UPDATE_PATIENT);

    const onConfirmUpdate = () => {
        if (!editValue) setEditValue(true);
        else {
            setEditValue(false);
            let inputs;
            if (key === "age")
                inputs = {
                    _id: patientId,
                    [key]: parseFloat(value),
                };
            else
                inputs = {
                    _id: patientId,
                    [key]: value,
                };
            updatePatient({
                variables: {
                    inputs: inputs,
                },
            }).then((res)=>{

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
