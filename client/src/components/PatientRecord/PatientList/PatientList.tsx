import "../PatientRecord/index.scss";

import { useEffect, useState } from "react";
import { useAppSelector } from "app/store";
import { Tabs } from "antd";

import Chart from "./Chart/Chart";

import { InfoTable } from "./TableInfo/Table";

import Pathological from "./Pathological";

import useInputDevice from "./useInputDevice";
import ThresholdStats from "./ThresholdStats";
import thermo from "../../../assets/themo.png";
import heart from "../../../assets/heart.png";
import spo2 from "../../../assets/spo2.jpg";
import blood from "../../../assets/blood.png";

import PatientTestHistory from "./PatientTestHistory";
import Exercises from "./Exercises";
import usePromise from "utils/usePromise";
import { GetMedicalStatsResponse } from "common/types";
import MedicineSchedule from "components/Profile/MedicineSchedule";
const { TabPane } = Tabs;

const PatientList = ({ match }: any) => {
  const patientId = match.params.id;
  const account = useAppSelector((state) => state.account);

  const [patientList] = usePromise(`/doctor/patients/${account.id}`);

  const deviceData: any = {};

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

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="patient-wrapper">
      <div className="patient-choose"></div>
      {patientList && (
        <div className="patient-info-container">
          <Tabs onChange={onChange} type="card">
            <TabPane tab="Thông tin" key="profile">
              <div className="patient-info-title">Hồ sơ bệnh nhân</div>
              <div className="patient-info-detail">
                <InfoTable data={patientList[patientId]} editable={false} />
              </div>
            </TabPane>
            <TabPane tab="Bài tập" key="exercise">
              <div className="patient-info-Exercises">
                <Exercises data={patientList[patientId]} role="patient" />
              </div>
            </TabPane>
            <TabPane tab="Lịch thuốc" key="medicine">
              <div className="patient-info-medicine">
                <MedicineSchedule patientAccountId={patientList[patientId].id} />
              </div>
            </TabPane>
            <TabPane tab="Stats1" key="stat_1">
              <div className="patient-info-stats">
                <ThresholdStats
                  id={patientList[patientId]._id}
                  data={deviceData?.getDevice?.SpO2Threshold}
                  status={thresholdStatus.spO2}
                  unit="%"
                  icon={spo2}
                  name="SpO2"
                  color="royalblue"
                />
                <ThresholdStats
                  id={patientList[patientId]._id}
                  data={deviceData?.getDevice?.heartRateThreshold}
                  status={thresholdStatus.heartRate}
                  unit="bpm"
                  icon={heart}
                  name="Nhịp tim"
                  color="mediumseagreen"
                />
                <ThresholdStats
                  id={patientList[patientId]._id}
                  data={deviceData?.getDevice?.bodyTempThreshold}
                  status={thresholdStatus.bodyTemp}
                  unit="°C"
                  icon={thermo}
                  name="Nhiệt độ"
                  color="brown"
                />
                <ThresholdStats
                  id={patientList[patientId]._id}
                  data={deviceData?.getDevice}
                  status={thresholdStatus.bloodPress}
                  unit="bpm"
                  icon={blood}
                  name="Huyết áp cao"
                  color="#ff668f"
                />
                <ThresholdStats
                  id={patientList[patientId]._id}
                  data={deviceData?.getDevice}
                  status={thresholdStatus.bloodPress}
                  unit="bpm"
                  icon={blood}
                  name="Huyết áp thấp"
                  color="#ff668f"
                />
              </div>
            </TabPane>
            <TabPane tab="Chỉ số" key="chart">
              <Chart id={patientList[patientId].id} thresholdStatus={handleChangeThresholdStatus} />
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default PatientList;
