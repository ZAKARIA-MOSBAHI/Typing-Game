import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import ControlPannel from "./components/ControlPannel";
import { motion } from "framer-motion";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { calculateAvgAccuracy } from "../../utils/calculateAvgAccuracy";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Results({ newGame }) {
  const { scoreBoard } = useContext(GameContext);
  const isDark = document.documentElement.classList.contains("dark");

  const data = {
    labels: scoreBoard.map((item) => item.time),
    datasets: [
      {
        label: "WPM",
        data: scoreBoard.map((item) => item.wpm),
        borderColor: isDark ? "#eeeeee" : "#1E1E1E",
        backgroundColor: isDark ? "#eeeeee" : "#1E1E1E",
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Errors",
        type: "scatter",
        data: scoreBoard.map((item) =>
          item.mistakes === 0 ? null : item.mistakes
        ),
        pointStyle: "cross",
        pointRadius: 5,
        borderColor: "red",
        backgroundColor: "red",
        tension: 1,
        yAxisID: "y1",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        font: {
          family: "'Source Code Pro', monospace",
          size: 20, // Font size
        },
        color: isDark ? "#eeeeee" : "#1E1E1E", // Title text color
      },
      tooltip: {
        font: {
          family: "'Source Code Pro', monospace",
          size: 20, // Font size
        },
        color: isDark ? "#eeeeee" : "#1E1E1E",
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label} : ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        beginAtZero: false,
        grid: {
          color: isDark ? "#131313" : "#80808007",
        },
        title: {
          display: true,
          text: "Time (seconds)",
          font: {
            family: "'Source Code Pro', monospace",
            size: 20, // Font size
          },
          color: isDark ? "#eeeeee" : "#1E1E1E",
        },
        ticks: {
          stepSize: scoreBoard.length > 15 ? 5 : 1,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "WPM",
          font: {
            family: "'Source Code Pro', monospace",
            size: 20, // Font size
          },
          color: isDark ? "#eeeeee" : "#1E1E1E",
        },
        ticks: {
          stepSize: 20,
        },
        type: "linear",
        display: true,
        position: "left",
        grid: {
          drawOnChartArea: true,
          color: isDark ? "#131313" : "#80808007",
        },
      },
      y1: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Errors",
          font: {
            family: "'Source Code Pro', monospace",
            size: 20, // Font size
          },
          color: isDark ? "#eeeeee" : "#1E1E1E",
        },
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
          color: isDark ? "#131313" : "#80808007",
        },
      },
    },
  };
  const variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className="w-full h-screen flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 lg:gap-8">
          <div className="dark:text-[#eeeeee] text-[#808080] text-4xl text-center  sm:text-6xl flex sm:flex-col justify-between items-center gap-4">
            <h1>
              <p className="dark:text-[#646464] text-[#1E1E1E] text-2xl sm:text-4xl">
                WPM
              </p>
              <p className="">{scoreBoard[scoreBoard.length - 1].wpm}</p>
            </h1>
            <h1>
              <p
                className="dark:text-[#646464] text-[#1E1E1E]  text-2xl sm:text-4xl"
                title="accuracy"
              >
                ACC
              </p>
              <p className="">{calculateAvgAccuracy(scoreBoard)}%</p>
            </h1>
          </div>
          <div className="w-full  sm:w-[80%] h-[300px]">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
      <ControlPannel newGame={newGame} />
    </motion.div>
  );
}
