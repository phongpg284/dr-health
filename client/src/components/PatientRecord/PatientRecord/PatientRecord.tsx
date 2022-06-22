import "./index.scss";

import { useEffect, useState } from "react";
import { useAppSelector } from "app/store";

import { InfoTable } from "../PatientList/TableInfo/Table";
import MedicineSchedule from "../PatientList/MedicineSchedule";
import useInputDevice from "../PatientList/useInputDevice";

import ThresholdStats from "../PatientList/ThresholdStats";

import thermo from "../../../assets/themo.png";
import heart from "../../../assets/heart.png";
import spo2 from "../../../assets/spo2.jpg";
import Chart from "../PatientList/Chart/Chart";
import blood from "../../../assets/blood.png";

import PatientTestHistory from "../PatientList/PatientTestHistory";
import Exercises from "../PatientList/Exercises";
import usePromise from "utils/usePromise";

const PatientRecord = () => {
    const account = useAppSelector((state) => state.account);
    const [patientData] = usePromise(`/user/role/${account.id}`);

    const deviceData: any = {}

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
    console.log(patientData)
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
                        {/* <PatientTestHistory patientId={patientData.id} /> */}
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
                        <Chart id={patientData.id} thresholdStatus={handleChangeThresholdStatus} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientRecord;
