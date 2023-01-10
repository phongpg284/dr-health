import { Bar, Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { getChartType, getThresholdChart } from "./Chart";
import { enGB } from "date-fns/locale";
import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "./Chart.scss";
import zoomPlugin from "chartjs-plugin-zoom";
ChartJS.register(...registerables, zoomPlugin);

function SingleLineChart(props: { data: any; title: string; color: string | [string, string]; timeType: string; dateStart: Date; type: string; average?: boolean; live: boolean }) {
  const { data, title, color, timeType, dateStart, type, average = false, live } = props;
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

export default SingleLineChart;
