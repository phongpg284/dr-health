import "./index.scss";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "app/store";

import { InfoTable } from "../PatientList/TableInfo/Table";

import ThresholdStats from "../PatientList/ThresholdStats";

import thermo from "../../../assets/themo.png";
import heart from "../../../assets/heart.png";
import spo2 from "../../../assets/spo2.jpg";
import Chart from "../PatientList/Chart/Chart";
import blood from "../../../assets/blood.png";

import Exercises from "../PatientList/Exercises";
import usePromise from "utils/usePromise";
import { Spin, Tabs } from "antd";
import MedicineSchedule from "components/Profile/MedicineSchedule";
import AppointmentSchedule from "../PatientList/AppointmentSchedule";
import { useApi } from "utils/api";
import { SocketContext } from "App";
import { Socket } from "socket.io-client";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { DeviceRecordData, PatientStatEnum, PatientStats } from "helpers/types";
import { usePatientLatestStat } from "helpers/use-patient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { TabPane } = Tabs;

const statusMap = {
  [PatientStatEnum.HEART_BPM]: "heartRate",
  [PatientStatEnum.OXYGEN_PERCENT]: "spO2",
  [PatientStatEnum.TEMPERATURE]: "bodyTemp",
};

const PatientRecord = () => {
  const curStat = useRef<DeviceRecordData>();
  const [patientStats, setPatientStats] = useState<DeviceRecordData>();
  const account = useAppSelector((state) => state.account);
  const socket = useContext(SocketContext);

  const [patientData] = usePromise(`/user/${account.id}`);
  const { stat, isLoading, notifications } = usePatientLatestStat(patientData?.patientId);

  const [thresholdStatus, setThresholdStatus] = useState({
    spO2: false,
    heartRate: false,
    bodyTemp: false,
  });

  useEffect(() => {
    if (stat?.id) {
      setPatientStats(stat);
    }
  }, [stat]);

  useEffect(() => {
    if (patientStats && notifications) {
      if (patientStats.id !== curStat?.current?.id) {
        const status = {
          spO2: false,
          heartRate: false,
          bodyTemp: false,
        };
        notifications.forEach((noti) => {
          if (noti.type === "warning") {
            status[statusMap[noti.stat]] = true;
            toast(`Cảnh báo: ${noti.message}`, { type: "warning" });
          }
        });
        setThresholdStatus(status);
        curStat.current = patientStats
      }
    }
  }, [patientStats, notifications]);

  const renderContent = useMemo(
    () =>
      patientData && patientStats?.id && !isLoading ? (
        <div className="patient-info-container">
          <Tabs type="card">
            <TabPane tab="Thông tin" key="profile">
              <div className="patient-info-title">Hồ sơ bệnh nhân</div>
              <div className="patient-info-detail">
                <InfoTable data={patientData} />
              </div>
            </TabPane>
            <TabPane tab="Bài tập" key="exercise">
              <div className="patient-info-Exercises">
                <Exercises data={patientData} role="patient" />
              </div>
            </TabPane>
            <TabPane tab="Lịch thuốc" key="medicine">
              <div className="patient-info-medicine">
                <MedicineSchedule patientAccountId={patientData.id} />
              </div>
            </TabPane>
            {patientStats && (
              <TabPane tab="Stats1" key="stat_1">
                <div className="patient-info-stats">
                  <p>Cập nhật lúc: {new Date(patientStats.createdAt).toLocaleString("vn")}</p>
                  <ThresholdStats id={patientData._id} data={patientStats?.oxygen_percent} status={thresholdStatus.spO2} unit="%" icon={spo2} name="SpO2" color="royalblue" />
                  <ThresholdStats
                    id={patientData._id}
                    data={patientStats?.heart_beat_bpm}
                    status={thresholdStatus.heartRate}
                    unit="bpm"
                    icon={heart}
                    name="Nhịp tim"
                    color="mediumseagreen"
                  />
                  <ThresholdStats id={patientData._id} data={patientStats?.temperature} status={thresholdStatus.bodyTemp} unit="°C" icon={thermo} name="Nhiệt độ" color="brown" />
                  <Chart id={patientData?.patientId} />
                </div>
              </TabPane>
            )}
            {/* <TabPane tab="Chỉ số" key="chart">
              <Chart id={account.roleId} thresholdStatus={handleChangeThresholdStatus} />
            </TabPane> */}
            <TabPane tab="Lịch hẹn" key="apppointment">
              <AppointmentSchedule id={patientData.id} />
            </TabPane>
          </Tabs>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Spin size="large" />
        </div>
      ),
    [account, patientData, patientStats, thresholdStatus, isLoading]
  );

  return (
    <div className="patient-wrapper">
      <ToastContainer />
      <div className="patient-choose"></div>
      {renderContent}
    </div>
  );
};

export default PatientRecord;
