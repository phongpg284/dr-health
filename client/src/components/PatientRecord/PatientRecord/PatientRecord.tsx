import "./index.scss";

import { useContext, useEffect, useMemo, useState } from "react";
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
import { Tabs } from "antd";
import MedicineSchedule from "components/Profile/MedicineSchedule";
import AppointmentSchedule from "../PatientList/AppointmentSchedule";
import { useApi } from "utils/api";
import { SocketContext } from "App";
import { Socket } from "socket.io-client";
import { Loading3QuartersOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

const PatientRecord = () => {
  const [patientStats, setPatientStats] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [patientDetail, setPatientDetail] = useState<any>();
  const account = useAppSelector((state) => state.account);
  const socket = useContext(SocketContext);
  console.log("socket", socket);
  const api = useApi();
  const [patientData] = usePromise(`/user/${account.id}`);
  console.log("patientData", patientData);

  const deviceData: any = {};

  useEffect(() => {
    (socket as Socket).on("device_stats", (data) => {
      console.log("data", data);
    });

    return () => {
      (socket as Socket).off("device_stats");
    };
  }, []);

  const [thresholdStatus, setThresholdStatus] = useState({
    spO2: true,
    heartRate: true,
    bodyTemp: true,
    bloodPress: false,
  });

  console.log("patientStats", patientStats);
  console.log("patientDetails", patientDetail);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && patientData) {
        api
          .get(`patient/device_records/${patientData?.patientId}`)
          .then(({ data }) =>
            setPatientStats(
              [...data].sort((a, b) => {
                const aDate = new Date(a.createdAt).valueOf();
                const bDate = new Date(b.createdAt).valueOf();

                if (aDate > bDate) return -1;
                else if (aDate < bDate) return 1;
                else return 0;
              })[0]
            )
          )
          .finally(() => setLoading(false));
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [loading, patientData]);

  const handleChangeThresholdStatus = (key: string, status: boolean) => {
    setThresholdStatus((prev) => {
      return {
        ...prev,
        [key]: status,
      };
    });
  };

  const renderContent = useMemo(
    () =>
      patientData && patientStats ? (
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
            <TabPane tab="Stats1" key="stat_1">
              <div className="patient-info-stats">
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
                {/* <ThresholdStats id={patientData._id} data={deviceData?.getDevice} status={thresholdStatus.bloodPress} unit="bpm" icon={blood} name="Huyết áp cao" color="#ff668f" /> */}
                {/* <ThresholdStats
                id={patientData._id}
                data={deviceData?.getDevice}
                status={thresholdStatus.bloodPress}
                unit="bpm"
                icon={blood}
                name="Huyết áp thấp"
                color="#ff668f"
              /> */}
              </div>
            </TabPane>
            {/* <TabPane tab="Chỉ số" key="chart">
              <Chart id={account.roleId} thresholdStatus={handleChangeThresholdStatus} />
            </TabPane> */}
            <TabPane tab="Lịch hẹn" key="apppointment">
              <AppointmentSchedule id={patientData.id} />
            </TabPane>
          </Tabs>
        </div>
      ) : (
        <Loading3QuartersOutlined />
      ),
    [account, patientData, patientDetail, patientStats, thresholdStatus]
  );

  return (
    <div className="patient-wrapper">
      <div className="patient-choose"></div>
      {renderContent}
    </div>
  );
};

export default PatientRecord;
