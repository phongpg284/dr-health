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
import { calculateStat } from "utils/stats";
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
  if (label === arrType[0].label) return { max: 100, min: 0 };
  if (label === arrType[1].label) return { max: 45, min: 30 };
  else return "auto";
};

const Chart = ({ id, thresholdStatus }: any) => {
  const [medicalStats, loaded] = usePromise<GetMedicalStatsResponse>(`/patient/medical_stats/${id}`);

  const [type, setType] = useState<typeof arrType[number]>(arrType[2]);

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

  const handleClickStatTracking = (key: typeof arrType[number]) => {
    setType(key);
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
      {loaded && medicalStats && <ListChart deviceData={medicalStats} selectedType={type?.key} />}
    </div>
  );
};
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function ListChart({ deviceData, selectedType }: { deviceData: GetMedicalStatsResponse; selectedType: any }) {
  return (
    <div className="listChart">
      <MultipleChart deviceData={deviceData} selectedType={selectedType} />
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

function MultipleChart({ deviceData, selectedType }: { deviceData: GetMedicalStatsResponse; selectedType: any }) {
  const [timeType, setTimeType] = useState("Giờ");
  const [dateStart, setDateStart] = useState(dayjs("2022-7-2").startOf("day").toDate());

  const filterArr = {
    Giờ: (item: any) => dayjs(item?.createdAt) > dayjs(dateStart),
    Ngày: (item: any) => dayjs(item?.createdAt) > dayjs(dateStart),
    Tuần: (item: any) => dayjs(item?.createdAt) > dayjs(dateStart),
    Tháng: (item: any) => dayjs(item?.createdAt) > dayjs(dateStart),
  };

  console.log(deviceData);
  console.log(calculateStat("Ngày", deviceData.spO2, dateStart));

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

  const bloodPress = React.useMemo(() => {
    return deviceData?.bloodpress?.filter((filterArr as any)?.[timeType])?.map((item: any) => ({ y: item.value, x: dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss") })) ?? [];
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
          {/* <Dropdown overlay={MyMenu} placement="bottomCenter" arrow>
            <Button style={{ marginRight: "10px" }}>
              {type + " "} <DownOutlined />
            </Button>
          </Dropdown> */}
          <Dropdown overlay={TimeMenu} placement="bottomCenter" arrow>
            <Button style={{ marginRight: "10px" }}>
              {timeType + " "} <DownOutlined />
            </Button>
          </Dropdown>
          <DatePicker onChange={onChangeDatePick} format={"DD/MM/YYYY"} />
        </div>
        {timeType === "Giờ" && (
          <>
            {selectedType === arrType[0].key && <SingleLineChart arr={SpO2} title={arrType[0].label} color="darkblue" timeType={timeType} dateStart={dateStart} type="bar" />}
            {selectedType === arrType[1].key && <SingleLineChart arr={bodyTemp} title={arrType[1].label} color="coral" timeType={timeType} dateStart={dateStart} type="bar" />}
            {selectedType === arrType[2].key && <SingleLineChart arr={heartRate} title={arrType[2].label} color="brown" timeType={timeType} dateStart={dateStart} type="bar" />}
            {selectedType === arrType[3].key && (
              <SingleLineChart arr={[systolic, diastole]} title={arrType[3].label} color={["blue", "red"]} timeType={timeType} dateStart={dateStart} type="line" />
            )}
          </>
        )}
        {timeType !== "Giờ" && (
          <>
            {selectedType === arrType[0].key && (
              <SingleLineChart
                arr={calculateStat(timeType as any, deviceData.spO2, dateStart)}
                title={arrType[0].label}
                color="darkblue"
                timeType={timeType}
                dateStart={dateStart}
                type="bar"
                average
              />
            )}
            {selectedType === arrType[1].key && (
              <SingleLineChart
                arr={calculateStat(timeType as any, deviceData.body_temp, dateStart)}
                title={arrType[1].label}
                color="coral"
                timeType={timeType}
                dateStart={dateStart}
                type="bar"
                average
              />
            )}
            {selectedType === arrType[2].key && (
              <SingleLineChart
                arr={calculateStat(timeType as any, deviceData.heart_rate, dateStart)}
                title={arrType[2].label}
                color="brown"
                timeType={timeType}
                dateStart={dateStart}
                type="bar"
                average
              />
            )}
            {selectedType === arrType[3].key && (
              <SingleLineChart
                arr={calculateStat(timeType as any, deviceData.bloodpress, dateStart)}
                title={arrType[3].label}
                color={["blue", "red"]}
                timeType={timeType}
                dateStart={dateStart}
                type="line"
                average
              />
            )}
          </>
        )}
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

function SingleLineChart(props: { arr: any; title: string; color: string | [string, string]; timeType: string; dateStart: Date; type: string; average?: boolean }) {
  const { arr, title, color, timeType, dateStart, type, average = false } = props;
  const getChartType = (type: string) => {
    if (type === "Giờ") return "minute";
    if (type === "Ngày") return "hour";
    if (type === "Tháng") return "day";
  };
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
    // tension: 1,
    transitions: {
      zoom: {
        animation: {
          duration: 1000,
          easing: "easeOutCubic",
        },
      },
    },
    interaction: {
      mode: "index",
    },
  };
  // console.log(arr);
  if (average) {
    const data = {
      labels: arr?.label,
      datasets: [
        {
          label: title,
          data: arr?.data,
          backgroundColor: color as string,
          borderColor: color as string,
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
  const data = {
    labels: arr?.map(() => ""),
    datasets: [
      {
        label: title,
        data: arr,
        backgroundColor: color as string,
        borderColor: color as string,
        pointRadius: 0,
      },
    ],
  };
  console.log(arr);
  if (title === "Huyết áp") {
    const multisetData = {
      labels: arr?.[0]?.map(() => ""),
      datasets: [
        {
          label: "Tâm thu",
          data: arr[0],
          backgroundColor: color[0],
          borderColor: color[0],
          pointRadius: 0,
        },
        {
          label: "Tâm trương",
          data: arr[1],
          backgroundColor: color[1],
          borderColor: color[1],
          pointRadius: 0,
        },
      ],
    };
    return <div>{type === "line" && <Line options={options as any} data={multisetData} height="100vh" />}</div>;
  }

  return (
    <div>
      {type === "bar" && <Bar options={options as any} data={data} height="100vh" />}
      {type === "line" && <Line options={options as any} data={data} height="100vh" />}
    </div>
  );
}

export default Chart;
