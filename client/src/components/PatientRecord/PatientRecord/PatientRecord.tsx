import "./index.scss";

import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useAppSelector } from "app/store";

import { InfoTable } from "../PatientList/TableInfo/Table";
import MedicineSchedule from "../PatientList/MedicineSchedule";
import useInputDevice from "../PatientList/useInputDevice";

import { GET_DEVICE, GET_PATIENT } from "./schema";
import ThresholdStats from "../PatientList/ThresholdStats";

import thermo from "../../../assets/themo.png";
import heart from "../../../assets/heart.png";
import spo2 from "../../../assets/spo2.jpg";
import Chart from "../PatientList/Chart/Chart";
import blood from "../../../assets/blood.png";

import PatientTestHistory from "../PatientList/PatientTestHistory";
import Exercises from "../PatientList/Exercises";

const PatientRecord = () => {
    const account = useAppSelector((state) => state.account);
    const [patientData, setPatientData] = useState<any>();
    const { data } = useQuery(GET_PATIENT, {
        variables: {
            id: account.id,
        },
        fetchPolicy: "no-cache",
    });

    const [getDevice, { data: deviceData }] = useLazyQuery(GET_DEVICE, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (data) setPatientData(data.getPatient);
    }, [data]);

    useEffect(() => {
        if (patientData) {
            getDevice({
                variables: {
                    id: patientData.deviceId,
                },
            });
        }
    }, [patientData]);

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
            {patientData && (
                <div className="patient-info-container">
                    <div className="patient-info-title">Hồ sơ bệnh nhân</div>
                    <div className="patient-info-profile">
                        <div className="patient-info-detail">
                            <InfoTable data={patientData} />
                        </div>
                        <PatientTestHistory patientId={patientData._id} />
                        <div className="patient-info-right-content">
                            <div className="patient-info-sub-info">
                                <div className="patient-info-Exercises">
                                    <Exercises data={patientData} role="patient" />
                                </div>
                                <div className="patient-info-medicine">
                                    <MedicineSchedule medicineSchedule={patientData.medicineSchedule} />
                                </div>
                            </div>
                            <div className="patient-info-stats">
                                <ThresholdStats
                                    id={patientData._id}
                                    data={deviceData?.getDevice?.SpO2Threshold}
                                    status={thresholdStatus.spO2}
                                    unit="%"
                                    icon={spo2}
                                    name="SpO2"
                                    color="royalblue"
                                />
                                <ThresholdStats
                                    id={patientData._id}
                                    data={deviceData?.getDevice?.heartRateThreshold}
                                    status={thresholdStatus.heartRate}
                                    unit="bpm"
                                    icon={heart}
                                    name="Nhịp tim"
                                    color="mediumseagreen"
                                />
                                <ThresholdStats
                                    id={patientData._id}
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
                                    id={patientData._id}
                                    data={deviceData?.getDevice}
                                    status={thresholdStatus.bloodPress}
                                    unit="bpm"
                                    icon={blood}
                                    name="Huyết áp cao"
                                    color="#ff668f"
                                />
                                <ThresholdStats
                                    id={patientData._id}
                                    data={deviceData?.getDevice}
                                    status={thresholdStatus.bloodPress}
                                    unit="bpm"
                                    icon={blood}
                                    name="Huyết áp thấp"
                                    color="#ff668f"
                                />
                            </div>
                        </div>
                        <Chart id={patientData.deviceId} thresholdStatus={handleChangeThresholdStatus} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientRecord;
