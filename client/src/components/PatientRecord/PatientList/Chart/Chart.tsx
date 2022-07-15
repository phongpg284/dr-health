import "../../PatientRecord/index.scss";
import React, { useEffect, useState } from "react";
// import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, registerables } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import InputRange from "react-input-range";
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
import { enGB } from "date-fns/locale";
ChartJS.register(...registerables, zoomPlugin);

const vnLegend = {
  spO2: "Chỉ số SpO2",
  bodyTemp: "Nhiệt độ",
  heartRate: "Nhịp tim",
  diastole: "Tâm trương",
  systolic: "Tâm thu",
};

const vnBloodPressLegend = {
  diastole: "Tâm trương",
  systolic: "Tâm thu",
};

const getUnit = (unit: string) => {
  if (unit === "spO2") return "%";
  if (unit === "bodyTemp") return "°C";
  if (unit === "heartRate") return "bpm";
  if (unit === "diastole") return "bpm";
  if (unit === "systolic") return "bpm";
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload &&
          payload.map((line: any) => (
            <p key={line.name} style={{ color: line.stroke }} className="tooltip-line">{`${(vnLegend as any)[line.name]}: ${line.value} ${getUnit(line?.name)}`}</p>
          ))}
      </div>
    );
  }

  return null;
};

const Chart = ({ id, thresholdStatus }: any) => {
  const [medicalStats, loaded] = usePromise<GetMedicalStatsResponse>(`/patient/medical_stats/${id}`);

  const [opacityState, setOpacityState] = useState({
    spO2: 0.2,
    bodyTemp: 0.2,
    heartRate: 0.2,
    diastole: 0.2,
    systolic: 0.2,
  });

  const handleMouseEnter = (e: any) => {
    const { dataKey } = e;

    setOpacityState({ ...opacityState, [dataKey]: 1 });
  };

  const handleMouseLeave = (e: any) => {
    const { dataKey } = e;

    setOpacityState({ ...opacityState, [dataKey]: 0.2 });
  };

  const renderDescriptionLegend = (value: any, entry: any) => {
    return <span>{(vnLegend as any)?.[value] || (vnBloodPressLegend as any)?.[value]}</span>;
  };

  return (
    <div className="patient-info-graph-wrapper">
      <StatsWrapper>
        <StatTracking icon={BloodIcon} edge={BloodEdgeIcon} color="#fff5f6" name="Nhịp tim" value={99} unit="bpm" textColor="#fc6371" />
        <StatTracking icon={ThermalIcon} edge={ThermalEdgeIcon} color="#f4f3fa" name="Nhiệt độ" value={99} unit="C" textColor="#7c72c8" />
        <StatTracking icon={SpO2Icon} edge={SpO2EdgeIcon} color="#eaf3ee" name="Nồng độ SpO2" value={99} unit="%" textColor="#338d5a" />
        <StatTracking icon={PressIcon} edge={PressEdgeIcon} color="#fbf4e8" name="Huyết áp" value={99} unit="bbpm" textColor="#da8e16" />
      </StatsWrapper>
      {loaded && medicalStats && <ListChart deviceData={medicalStats} />}
    </div>
  );
};
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function ListChart({ deviceData }: { deviceData: any }) {
  const diastole = React.useMemo(() => {
    return deviceData?.diastole?.map((item: any) => item.value) ?? [];
  }, [deviceData]);
  const systolic = React.useMemo(() => {
    return deviceData?.systolic?.map((item: any) => item.value) ?? [];
  }, [deviceData]);

  return (
    <div className="listChart">
      {/* <ChartDiasAndSys diastole={diastole} systolic={systolic} /> */}
      {/* <SingleLineChart arr={SpO2} title="SpO2" color="coral"/> */}
      <MultipleChart deviceData={deviceData} />
    </div>
  );
}

function ChartDiasAndSys({ diastole, systolic }: { diastole: any[]; systolic: any[] }) {
  const min = 0;
  const max = diastole.length - 1;

  const [range, setRange] = useState({
    min: 0,
    max: max,
  });

  React.useEffect(() => {
    if (diastole.length > 100) {
      setRange({
        min: max - 100,
        max: max,
      });
    }
  }, [diastole]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const diastole1 = React.useMemo(() => {
    return diastole.slice(range.min, range.max);
  }, [diastole, range]);
  const systolic1 = React.useMemo(() => {
    return systolic.slice(range.min, range.max);
  }, [systolic, range]);

  const data = {
    labels: diastole1.map(() => ""),
    datasets: [
      {
        label: "Tâm thu",
        data: systolic1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tâm trương",
        data: diastole1,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="myChartWrapper">
      <div className="chartContent">
        <Line options={options} data={data} height="80vh" />
        <div className="rangeWrapper">
          <InputRange
            maxValue={max}
            minValue={min}
            value={range}
            onChange={(value) => {
              if (typeof value !== "number") {
                setRange(value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MultipleChart({ deviceData }: { deviceData: any }) {
  const arrType = ["SpO2", "Nhiệt độ", "Nhịp tim"];

  const [type, setType] = useState(arrType[0]);
  const [timeType, setTimeType] = useState("Ngày");
  const [dateStart, setDateStart] = useState(dayjs("2022-6-9").startOf("day").toDate());

  const filterArr = {
    Ngày: (item: any) => dayjs(item?.createdAt) < dayjs(dateStart).add(1, "day") && dayjs(item.createdAt) > dayjs(dateStart),
    Tuần: (item: any) => dayjs(item?.createdAt) < dayjs(dateStart).add(1, "week") && dayjs(item.createdAt) > dayjs(dateStart),
    Tháng: (item: any) => dayjs(item?.createdAt) < dayjs(dateStart).add(1, "month") && dayjs(item.createdAt) > dayjs(dateStart),
  };

  const SpO2 = React.useMemo(() => {
    console.log(timeType, dateStart);
    console.log(deviceData.spO2);
    const res = deviceData?.spO2?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
    // return res.flatMap((ele: any) => [ele, { x: null, y: ele?.y }]);
    return res;
  }, [deviceData, timeType, dateStart]);
  const bodyTemp = React.useMemo(() => {
    return deviceData?.bodyTemp?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
  }, [deviceData, timeType, dateStart]);

  const heartRate = React.useMemo(() => {
    return deviceData?.heartRate?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
  }, [deviceData, timeType, dateStart]);

  const MyMenu = (
    <Menu>
      {arrType.map((item: any) => {
        if (item !== type) {
          return (
            <Menu.Item>
              <div onClick={() => setType(item)}>{item}</div>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );

  const TimeMenu = (
    <Menu>
      {["Ngày", "Tuần", "Tháng"].map((item: any) => {
        if (item !== type) {
          return (
            <Menu.Item>
              <div onClick={() => setTimeType(item)}>{item}</div>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );

  const onChangeDatePick = (date: any, dateString: string) => {
    setDateStart(dayjs(date, "DD/MM/YYYY").startOf("day").toDate());
  };

  return (
    <div className="myChartWrapper">
      <div className="chartContent">
        <div className="dropDownSpace">
          <Dropdown overlay={MyMenu} placement="bottomCenter" arrow>
            <Button style={{ marginRight: "10px" }}>
              {type + " "} <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={TimeMenu} placement="bottomCenter" arrow>
            <Button style={{ marginRight: "10px" }}>
              {timeType + " "} <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={TimeMenu} placement="bottomCenter" arrow>
            <DatePicker onChange={onChangeDatePick} format={"DD/MM/YYYY"} />
          </Dropdown>
        </div>
        {type === arrType[0] && <SingleLineChart arr={SpO2} title={type} color="darkblue" timeType={timeType} dateStart={dateStart} />}
        {type === arrType[1] && <SingleLineChart arr={bodyTemp} title={type} color="coral" timeType={timeType} dateStart={dateStart} />}
        {type === arrType[2] && <SingleLineChart arr={heartRate} title={type} color="brown" timeType={timeType} dateStart={dateStart} />}
      </div>
    </div>
  );
}

function StackBarChart({ arr, title }: { arr: any[]; title: string }) {
  const min = 0;
  const max = arr.length - 1;

  const [range, setRange] = useState({
    min: 0,
    max: max,
  });

  React.useEffect(() => {
    if (arr.length > 100) {
      setRange({
        min: max - 100,
        max: max,
      });
    }
  }, [arr]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const arrSlice = React.useMemo(() => {
    return arr.slice(range.min, range.max);
  }, [arr, range]);

  const data = {
    labels: arrSlice.map(() => ""),
    datasets: [
      {
        label: "Đúng",
        backgroundColor: "lightskyblue",
        data: arrSlice.map((item: any) => item.positive),
      },
      {
        label: "Sai",
        backgroundColor: "lightpink",
        data: arrSlice.map((item: any) => -item.negative),
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} height="80vh" />
      <div className="rangeWrapper">
        <InputRange
          maxValue={max}
          minValue={min}
          value={range}
          onChange={(value) => {
            if (typeof value !== "number") {
              setRange(value);
            }
          }}
        />
      </div>
    </div>
  );
}

function SingleLineChart(props: { arr: any[]; title: string; color: string; timeType: string; dateStart: Date }) {
  const { arr, title, color, timeType, dateStart } = props;
  console.log(arr);
  const getChartType = (type: string) => {
    if (type === "Ngày") return "hour";
    if (type === "Tháng") return "day";
  };
  console.log(getChartType(timeType));
  const options = {
    animation: false,
    spanGaps: true,
    responsive: true,
    scales: {
      y: {
        // title: {
        //   display: true,
        //   text: "Weight in lbs",
        // },
        min: 0,
      },
      x: {
        adapters: {
          date: {
            locale: enGB,
          },
        },
        type: "time",
        distribution: "linear",
        min: dateStart,
        max: dayjs(dateStart).add(1, "day").toDate(),
        time: {
          parser: "yyyy/MM/dd HH:mm:ss",
          unit: getChartType(timeType),
        },
        // title: {
        //   display: true,
        //   text: "Date",
        // },
      },
    },
    plugins: {
      legend: { position: "top" },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
            mode: "x",
          },
          mode: "x",
        },
      },
    },
    tension: 1,
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOutCubic",
        },
      },
    },
  };

  const data = {
    labels: arr?.map(() => ""),
    datasets: [
      {
        label: title,
        data: arr,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div>
      <Bar options={options as any} data={data} height="100vh" />
    </div>
  );
}

export default Chart;
