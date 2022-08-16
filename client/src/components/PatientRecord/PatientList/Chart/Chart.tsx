import "../../PatientRecord/index.scss";
import React, { useContext, useEffect, useState } from "react";
// import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, registerables } from "chart.js";
import "react-input-range/lib/css/index.css";
import { Menu, Dropdown, Button, DatePicker } from "antd";

import "./Chart.scss";

import { DownOutlined } from "@ant-design/icons";
import usePromise from "utils/usePromise";
import { GetMedicalStatsResponse } from "common/types";
import BloodIcon from "assets/chart/blood.png";
import ThermalIcon from "assets/chart/thermal.png";
import SpO2Icon from "assets/chart/spo2.png";
import PressIcon from "assets/chart/press.svg";
import BloodEdgeIcon from "assets/chart/blood_edge.png";
import ThermalEdgeIcon from "assets/chart/thermal_edge.png";
import SpO2EdgeIcon from "assets/chart/spo2_edge.png";
import PressEdgeIcon from "assets/chart/press_edge.png";
import { StatsWrapper } from "./style";
import StatTracking from "./Stat";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";

import dayjs from "dayjs";
import moment from "moment";

import { calculateStat } from "utils/stats";
import SingleLineChart from "./SingleLineChart";
import DoubleLineChart from "./DoubleLineChart";
import { SocketContext } from "App";
ChartJS.register(...registerables, zoomPlugin);

const arrType = [
  {
    label: "SpO2",
    key: "spo2",
  },
  {
    label: "Nhiệt độ",
    key: "temperature",
  },
  {
    label: "Nhịp tim",
    key: "heart_rate",
  },
  {
    label: "Huyết áp",
    key: "blood_press",
  },
] as const;

export const getThresholdChart = (label: any) => {
  if (label === arrType[0].label) return { max: 100, min: 90 };
  if (label === arrType[1].label) return { max: 45, min: 30 };
  else return "auto";
};

export const getChartType = (type: string) => {
  if (type === "Giờ") return "minute";
  if (type === "Ngày") return "hour";
  if (type === "Tháng") return "day";
};

const Chart = ({ id, thresholdStatus }: any) => {
  const [refetch, setRefetch] = useState(false);
  const [medicalStats, loaded] = usePromise<GetMedicalStatsResponse>(`/patient/medical_stats/${id}`, [refetch] as any);
  const [type, setType] = useState<typeof arrType[number]>(arrType[2]);

  const handleClickStatTracking = (key: typeof arrType[number]) => {
    setType(key);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setRefetch((prev) => !prev);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="patient-info-graph-wrapper">
      <StatsWrapper>
        <StatTracking
          onClick={handleClickStatTracking}
          type={arrType[2]}
          icon={BloodIcon}
          edge={BloodEdgeIcon}
          color="#fff5f6"
          selectedType={type}
          value={medicalStats?.heart_rate?.[medicalStats?.heart_rate?.length - 1]?.value}
          date={dayjs(medicalStats?.heart_rate?.[medicalStats?.heart_rate?.length - 1]?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
          unit="bpm"
          textColor="#fc6371"
        />
        <StatTracking
          onClick={handleClickStatTracking}
          type={arrType[1]}
          icon={ThermalIcon}
          edge={ThermalEdgeIcon}
          color="#f4f3fa"
          selectedType={type}
          value={medicalStats?.body_temp?.[medicalStats?.body_temp?.length - 1]?.value}
          date={dayjs(medicalStats?.body_temp?.[medicalStats?.body_temp?.length - 1]?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
          unit="C"
          textColor="#7c72c8"
        />
        <StatTracking
          onClick={handleClickStatTracking}
          type={arrType[0]}
          icon={SpO2Icon}
          edge={SpO2EdgeIcon}
          color="#eaf3ee"
          selectedType={type}
          value={medicalStats?.spO2?.[medicalStats?.spO2?.length - 1]?.value}
          unit="%"
          date={dayjs(medicalStats?.spO2?.[medicalStats?.spO2?.length - 1]?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
          textColor="#338d5a"
        />
        <StatTracking
          onClick={handleClickStatTracking}
          type={arrType[3]}
          icon={PressIcon}
          edge={PressEdgeIcon}
          color="#fbf4e8"
          selectedType={type}
          value={[medicalStats?.blood_press?.[medicalStats?.blood_press?.length - 1]?.value, medicalStats?.blood_press?.[medicalStats?.blood_press?.length - 1]?.secondValue]}
          unit="mmHg"
          date={dayjs(medicalStats?.blood_press?.[medicalStats?.blood_press?.length - 1]?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
          textColor="#da8e16"
        />
      </StatsWrapper>
      {medicalStats && (
        <div className="listChart">
          <MultipleChart deviceData={medicalStats} selectedType={type?.key} />
        </div>
      )}
    </div>
  );
};
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function MultipleChart({ deviceData, selectedType }: { deviceData: GetMedicalStatsResponse; selectedType: any }) {
  const [timeType, setTimeType] = useState("Giờ");
  const [dateStart, setDateStart] = useState(dayjs(new Date()).startOf("day").toDate());

  const filterArr = {
    Giờ: (item: any) => dayjs(item?.createdAt) > dayjs(dateStart),
    Ngày: (item: any) => dayjs(item?.createdAt) > dayjs(dateStart),
    Tuần: (item: any) => dayjs(item?.createdAt) > dayjs(dateStart),
    Tháng: (item: any) => dayjs(item?.createdAt) > dayjs(dateStart),
  };

  const SpO2 = React.useMemo(() => {
    const res = deviceData?.spO2?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
    return res;
  }, [deviceData, timeType, dateStart]);

  const bodyTemp = React.useMemo(() => {
    return deviceData?.body_temp?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
  }, [deviceData, timeType, dateStart]);

  const heartRate = React.useMemo(() => {
    return deviceData?.heart_rate?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
  }, [deviceData, timeType, dateStart]);

  const diastole = React.useMemo(() => {
    return (
      deviceData?.blood_press?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.secondValue, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? []
    );
  }, [deviceData, timeType, dateStart]);

  const systolic = React.useMemo(() => {
    return deviceData?.blood_press?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
  }, [deviceData, timeType, dateStart]);

  const TimeMenu = (
    <Menu>
      {["Giờ", "Ngày", "Tuần", "Tháng"].map((item: any) => {
        return (
          <Menu.Item key={item}>
            <div onClick={() => setTimeType(item)}>{item}</div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const onChangeDatePick = (date: any, dateString: string) => {
    setDateStart(dayjs(date, "DD/MM/YYYY").startOf("day").toDate());
  };

  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      console.log("havesocket");
      socket.onAny((event: any, payload: any) => {
        console.log("socket test receive:", event, payload);
      });
      socket.on("stat", (payload: any) => {
        console.log("socket stat receive: ", payload);
      });
      socket.on("connect", () => {
        console.log("socket connect");
      });

      socket.on("disconnect", () => {
        console.log("socket disconnect");
      });
    }
  }, [socket]);

  const [liveSwitch, setLiveSwitch] = useState(false);

  const handleClickLive = () => {
    setLiveSwitch(true);
  };

  return (
    <div className="myChartWrapper">
      <div className="chartContent">
        <div className="dropDownSpace">
          <Button onClick={handleClickLive}>Trực tiếp</Button>
          <Dropdown overlay={TimeMenu} placement="bottomCenter" arrow>
            <Button style={{ marginRight: "10px" }}>
              {timeType + " "} <DownOutlined />
            </Button>
          </Dropdown>
          <DatePicker onChange={onChangeDatePick} format={"DD/MM/YYYY"} defaultValue={moment(dateStart)} />
        </div>
        {selectedType === arrType[0].key && (
          <SingleLineChart
            data={timeType === "Giờ" ? SpO2 : calculateStat(timeType as any, deviceData.spO2, dateStart)}
            title={arrType[0].label}
            color="#3ca067"
            timeType={timeType}
            dateStart={dateStart}
            type="bar"
            average={timeType !== "Giờ"}
            live={liveSwitch}
          />
        )}
        {selectedType === arrType[1].key && (
          <SingleLineChart
            data={timeType === "Giờ" ? bodyTemp : calculateStat(timeType as any, deviceData.body_temp, dateStart)}
            title={arrType[1].label}
            color="#5648be"
            timeType={timeType}
            dateStart={dateStart}
            type="bar"
            average={timeType !== "Giờ"}
            live={liveSwitch}
          />
        )}
        {selectedType === arrType[2].key && (
          <SingleLineChart
            data={timeType === "Giờ" ? heartRate : calculateStat(timeType as any, deviceData.heart_rate, dateStart)}
            title={arrType[2].label}
            color="brown"
            timeType={timeType}
            dateStart={dateStart}
            type="bar"
            average={timeType !== "Giờ"}
            live={liveSwitch}
          />
        )}
        {selectedType === arrType[3].key && (
          <DoubleLineChart
            data={timeType === "Giờ" ? systolic : calculateStat(timeType as any, deviceData.blood_press, dateStart, true)}
            secondData={timeType === "Giờ" ? diastole : calculateStat(timeType as any, deviceData.blood_press, dateStart, true)}
            title={arrType[3].label}
            color="#2a68c5"
            secondColor="#dd3e3e"
            timeType={timeType}
            dateStart={dateStart}
            type={timeType === "Giờ" ? "line" : "bar"}
            average={timeType !== "Giờ"}
            live={liveSwitch}
          />
        )}
      </div>
    </div>
  );
}

export default Chart;
