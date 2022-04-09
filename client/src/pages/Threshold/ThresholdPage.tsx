import { useQuery } from "@apollo/client";
import { useAppSelector } from "app/store";
import Threshold from "components/Threshold"
import { useEffect, useState } from "react";
import { GET_PATIENTS_OF_DOCTOR } from "./schema";

export default function ThresholdPage({match}: any) {
    const account = useAppSelector((state) => state.account);
    const patientIndex = match?.params?.id;
    const [patientList, setPatientList] = useState<any>();
    const { data } = useQuery(GET_PATIENTS_OF_DOCTOR, {
        variables: {
            id: account.id,
        },
    });

    useEffect(() => {
        if (data) setPatientList(data.getPatientsOfDoctor);
    }, [data]);

    return (
        <>
            {patientList && patientIndex && (
                <Threshold data={patientList[patientIndex]} />
            )}
        </>
    )
}