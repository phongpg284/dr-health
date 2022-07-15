import { useAppSelector } from "app/store";
import Threshold from "components/Threshold"
import { useEffect, useState } from "react";
import usePromise from "utils/usePromise";

export default function ThresholdPage({match}: any) {
    const account = useAppSelector((state) => state.account);
    const patientIndex = match?.params?.id;
    const [patientList, setPatientList] = useState<any>();
    const [patientData] = usePromise(`/doctor/patients/${account.id}`);

    useEffect(() => {
        if (patientData) setPatientList(patientData);
    }, [patientData]);

    return (
        <>
            {patientList && patientIndex && (
                <Threshold data={patientList[patientIndex]} />
            )}
        </>
    )
}