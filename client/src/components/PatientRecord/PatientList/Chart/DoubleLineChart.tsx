import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { getChartType, getThresholdChart } from "./Chart";
import dayjs from "dayjs";
import { enGB } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import "./Chart.scss";
ChartJS.register(...registerables, zoomPlugin);

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
  live: boolean;
}) {
  const { data, secondData, title, color, secondColor, timeType, dateStart, type, average = false, live } = props;

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
          min: live ? dayjs(new Date()).add(-2, "minute").toDate() : dateStart,
          max: live ? dayjs(new Date()).add(15, "minute").toDate() : dayjs(dateStart).add(15, "minute").toDate(),
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

export default DoubleLineChart;
