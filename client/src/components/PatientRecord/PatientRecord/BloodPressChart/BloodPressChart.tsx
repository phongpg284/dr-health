import { Line } from "react-chartjs-2";
import { ChartWrapper } from "./style";

const BloodPressChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels: [].map(() => ""),
    datasets: [
      {
        label: "Tâm thu",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tâm trương",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <ChartWrapper>
      <Line options={options} data={data} height="80vh" />
    </ChartWrapper>
  );
};
