import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TopHoldingsBarChart = ({
  holdings,
}: {
  holdings: { name: string; weighting: number }[];
}) => {
  const data = {
    labels: holdings.map((holding) => holding.name.split(' ')[0]),
    datasets: [
      {
        label: 'Weighting (%)',
        data: holdings.map((holding) => holding.weighting),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.2,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxTicksLimit: 10,
          minRotation: 0,
          maxRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: { dataIndex: number }[]) => {
            const index = tooltipItems[0].dataIndex;
            return holdings[index].name;
          },
        },
      },
    },
  };

  return (
    <div className="mt-4">
      <Bar data={data} options={options} />
    </div>
  );
};
