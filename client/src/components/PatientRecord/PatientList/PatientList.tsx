import "../PatientRecord/index.scss";

import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useAppSelector } from "app/store";

import Chart from "./Chart/Chart";

import { InfoTable } from "./TableInfo/Table";

import MedicineSchedule from "./MedicineSchedule";
import Pathological from "./Pathological";

import { GET_DEVICE, GET_PATIENTS_OF_DOCTOR } from "./schema";
import useInputDevice from "./useInputDevice";
import ThresholdStats from "./ThresholdStats";
import thermo from "../../../assets/themo.png";
import heart from "../../../assets/heart.png";
import spo2 from "../../../assets/spo2.jpg";
import blood from "../../../assets/blood.png";

import PatientTestHistory from "./PatientTestHistory";
import Exercises from "./Exercises";


const PatientList = ({ match }: any) => {
    const patientId = match.params.id;
    const account = useAppSelector((state) => state.account);

    const [patientList, setPatientList] = useState<any>();

    const { data } = useQuery(GET_PATIENTS_OF_DOCTOR, {
        variables: {
            id: account.id,
        },
    });

    const [getDevice, { data: deviceData }] = useLazyQuery(GET_DEVICE, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (data) setPatientList(data.getPatientsOfDoctor);
    }, [data]);

    useEffect(() => {
        if (patientList) {
            getDevice({
                variables: {
                    id: patientList[patientId].deviceId,
                },
            });
        }
    }, [patientList]);

    const handleUpdate = () => {
        getDevice({
            variables: {
                id: patientList[patientId].deviceId,
            },
        });
    };

    const [thresholdStatus, setThresholdStatus] = useState({
        spO2: false,
        heartRate: false,
        bodyTemp: false,
        bloodPress: false,
    });

    const handleChangeThresholdStatus = (key: string, status: boolean) => {
        setThresholdStatus((prev) => {
            return {
                ...prev,
                [key]: status,
            };
        });
    };

    const [heartRate, editHeartRate, onChangeHeartRate, onConfirmHeartRate, onCancelEditHeartRate] = useInputDevice("heartRate", 0, deviceData?.getDevice?._id);
    const [SpO2, editSpO2, onChangeSpO2, onConfirmSpO2, onCancelEditSpO2] = useInputDevice("SpO2", 0, deviceData?.getDevice?._id);
    const [bodyTemp, editBodyTemp, onChangeBodyTemp, onConfirmBodyTemp, onCancelEditBodyTemp] = useInputDevice("bodyTemp", 0, deviceData?.getDevice?._id);

    const handleEnablePushData = (key: string) => {
        if (key === "heartRate") onConfirmHeartRate();
        if (key === "SpO2") onConfirmSpO2();
        if (key === "bodyTemp") onConfirmBodyTemp();
    };

    const handleCancelEditAll = () => {
        onCancelEditHeartRate();
        onCancelEditSpO2();
        onCancelEditBodyTemp();
    };



    return (
        <div className="patient-wrapper">
            <div className="patient-choose"></div>
            {patientList && (
                <div className="patient-info-container">
                    <div className="patient-info-title">Hồ sơ bệnh nhân</div>
                    <div className="patient-info-profile">
                        <InfoTable data={patientList[patientId]} />
                        <PatientTestHistory patientId={patientList[patientId]._id}/>
                        <div className="patient-info-right-content">
                            <div className="patient-info-sub-info">
                                <div className="patient-info-Exercises">
                                    {/* <Pathological data={patientList[patientId]} role="doctor" /> */}
                                    <Exercises data={patientList[patientId]}/>
                                </div>
                                <div className="patient-info-medicine">
                                    <MedicineSchedule medicineSchedule={patientList[patientId].medicineSchedule} />
                                </div>
                            </div>
                            <div className="patient-info-stats">
                                <ThresholdStats
                                    id={patientId}
                                    data={deviceData?.getDevice?.SpO2Threshold}
                                    status={thresholdStatus.spO2}
                                    unit="%"
                                    icon={spo2}
                                    name="SpO2"
                                    color="royalblue"
                                />
                                <ThresholdStats
                                    id={patientId}
                                    data={deviceData?.getDevice?.heartRateThreshold}
                                    status={thresholdStatus.heartRate}
                                    unit="bpm"
                                    icon={heart}
                                    name="Nhịp tim"
                                    color="mediumseagreen"
                                />
                                <ThresholdStats
                                    id={patientId}
                                    data={deviceData?.getDevice?.bodyTempThreshold}
                                    status={thresholdStatus.bodyTemp}
                                    unit="°C"
                                    icon={thermo}
                                    name="Nhiệt độ"
                                    color="brown"
                                />
                            </div>
                            <div className="patient-info-stats">
                                <ThresholdStats
                                    id={patientId}
                                    data={deviceData?.getDevice}
                                    status={thresholdStatus.bloodPress}
                                    unit="bpm"
                                    icon={blood}
                                    name="Huyết áp cao"
                                    color="darkslateblue"
                                />
                                <ThresholdStats
                                    id={patientId}
                                    data={deviceData?.getDevice}
                                    status={thresholdStatus.bloodPress}
                                    unit="bpm"
                                    icon={blood}
                                    name="Huyết áp thấp"
                                    color="darkslateblue"
                                />
                            </div>
                        </div>
                        <Chart id={patientList[patientId].deviceId} thresholdStatus={handleChangeThresholdStatus} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientList;
