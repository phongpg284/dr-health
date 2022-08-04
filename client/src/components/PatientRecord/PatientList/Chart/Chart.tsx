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
import moment from "moment";

import { enGB } from "date-fns/locale";
import { calculateStat } from "utils/stats";
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

const getThresholdChart = (label: any) => {
  if (label === arrType[0].label) return { max: 100, min: 90 };
  if (label === arrType[1].label) return { max: 45, min: 30 };
  else return "auto";
};

const getChartType = (type: string) => {
  if (type === "Giờ") return "minute";
  if (type === "Ngày") return "hour";
  if (type === "Tháng") return "day";
};

const Chart = ({ id, thresholdStatus }: any) => {
  const [medicalStats, loaded] = usePromise<GetMedicalStatsResponse>(`/patient/medical_stats/${id}`);
  const [type, setType] = useState<typeof arrType[number]>(arrType[2]);

  const handleClickStatTracking = (key: typeof arrType[number]) => {
    setType(key);
  };

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
          value={[medicalStats?.bloodpress?.[medicalStats?.bloodpress?.length - 1]?.value, medicalStats?.bloodpress?.[medicalStats?.bloodpress?.length - 1]?.secondValue]}
          unit="mmHg"
          date={dayjs(medicalStats?.bloodpress?.[medicalStats?.bloodpress?.length - 1]?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
          textColor="#da8e16"
        />
      </StatsWrapper>
      {loaded && medicalStats && (
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
  const [dateStart, setDateStart] = useState(dayjs("2022-7-2").startOf("day").toDate());

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
    return deviceData?.bloodpress?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
  }, [deviceData, timeType, dateStart]);

  const systolic = React.useMemo(() => {
    return (
      deviceData?.bloodpress?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.secondValue, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? []
    );
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

  return (
    <div className="myChartWrapper">
      <div className="chartContent">
        <div className="dropDownSpace">
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
          />
        )}
        {selectedType === arrType[3].key && (
          <DoubleLineChart
            data={timeType === "Giờ" ? systolic : calculateStat(timeType as any, deviceData.bloodpress, dateStart, true)}
            secondData={timeType === "Giờ" ? diastole : calculateStat(timeType as any, deviceData.bloodpress, dateStart, true)}
            title={arrType[3].label}
            color="#2a68c5"
            secondColor="#dd3e3e"
            timeType={timeType}
            dateStart={dateStart}
            type={timeType === "Giờ" ? "line" : "bar"}
            average={timeType !== "Giờ"}
          />
        )}
      </div>
    </div>
  );
}

function SingleLineChart(props: { data: any; title: string; color: string | [string, string]; timeType: string; dateStart: Date; type: string; average?: boolean }) {
  const { data, title, color, timeType, dateStart, type, average = false } = props;
  let delayed: any;

  const options = {
    spanGaps: true,
    responsive: true,
    scales: {
      y: {
        ...(getThresholdChart(title) !== "auto" && { suggestedMin: (getThresholdChart(title) as any).min, suggestedMax: (getThresholdChart(title) as any).max }),
      },
      x: {
        adapters: {
          date: {
            locale: enGB,
          },
        },
        ...(!average && {
          type: "time",
          min: dateStart,
          max: dayjs(dateStart).add(15, "minute").toDate(),
          time: {
            parser: "yyyy/MM/dd HH:mm:ss",
            unit: getChartType(timeType),
          },
        }),
        distribution: "linear",
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 30,
          },
          boxWidth: 70,
        },
      },
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
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOutCubic",
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "x",
    },
    tooltip: {
      position: "nearest",
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context: any) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  };
  if (average) {
    const dataSet = {
      labels: data?.label,
      datasets: [
        {
          label: title,
          data: data?.data,
          backgroundColor: color as string,
          borderColor: color as string,
          pointRadius: 0,
        },
      ],
    };
    return (
      <div>
        <Bar options={options as any} data={dataSet} height="100vh" />
      </div>
    );
  }
  const dataSet = {
    labels: data?.map(() => ""),
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: color as string,
        borderColor: color as string,
        pointRadius: 0,
      },
    ],
  };
  return (
    <div>
      {type === "bar" && <Bar options={options as any} data={dataSet} height="100vh" />}
      {type === "line" && <Line options={options as any} data={dataSet} height="100vh" />}
    </div>
  );
}

function DoubleLineChart(props: {
  data: any;
  secondData: any;
  title: string;
  color: string;
  secondColor: string;
  timeType: string;
  dateStart: Date;
  type: string;
  average?: boolean;
}) {
  const { data, secondData, title, color, secondColor, timeType, dateStart, type, average = false } = props;
  const options = {
    animation: false,
    spanGaps: true,
    responsive: true,
    scales: {
      y: {
        ...(getThresholdChart(title) !== "auto" && { min: (getThresholdChart(title) as any).min, max: (getThresholdChart(title) as any).max }),
      },
      x: {
        adapters: {
          date: {
            locale: enGB,
          },
        },
        ...(!average && {
          type: "time",
          min: dateStart,
          max: dayjs(dateStart).add(15, "minute").toDate(),
          time: {
            parser: "yyyy/MM/dd HH:mm:ss",
            unit: getChartType(timeType),
          },
        }),
        distribution: "linear",
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 30,
          },
          boxWidth: 70,
        },
      },
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
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOutCubic",
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
      axis: "x",
    },
    tooltip: {
      position: "nearest",
    },
  };
  if (average) {
    const multisetData = {
      labels: data?.label,
      datasets: [
        {
          label: "Tâm thu",
          data: data?.data?.[0],
          backgroundColor: color,
          borderColor: color,
          pointRadius: 0,
        },
        {
          label: "Tâm trương",
          data: secondData?.data?.[1],
          backgroundColor: secondColor,
          borderColor: secondColor,
          pointRadius: 0,
        },
      ],
    };
    return (
      <div>
        <Bar options={options as any} data={multisetData} height="100vh" />
      </div>
    );
  }
  const multisetData = {
    labels: data?.map(() => ""),
    datasets: [
      {
        label: "Tâm thu",
        data: data,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 0,
      },
      {
        label: "Tâm trương",
        data: secondData,
        backgroundColor: secondColor,
        borderColor: secondColor,
        pointRadius: 0,
      },
    ],
  };
  return (
    <div>
      {type === "line" && <Line options={options as any} data={multisetData} height="100vh" />}
      {type === "bar" && <Bar options={options as any} data={multisetData} height="100vh" />}
    </div>
  );
}

export default Chart;
