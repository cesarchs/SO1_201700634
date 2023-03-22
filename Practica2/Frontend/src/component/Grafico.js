//import React, { useMemo } from "react";

//import {FFF } from "../App";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export var scores = [15,15];
const labels = ['%RAM','%CPU'];

const options = {
  fill: true,
  animations: true,
  scales: {
    y: {
      min: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

//myBarChart.data.datasets[0].data[4] = 50;//this update the value of may
//myBarChart.update();

export var data = {
    datasets: [
      {
        label: "Porcentajes",
        tension: 0.3,
        data: scores,
        borderColor: "silver",
        backgroundColor: "rgb(13, 93, 122 )",
        borderWidth:5,
        hoverBackgroundColor:"rgb(205, 5, 48   )",
        hoverBorderColor:"rgb(2, 0, 114 )"

      },
    ],
    labels,
  };


  const BarChart = () => {

  return (
    <div id="BarrasWWW" style={{width:'90%',height:'580px',backgroundColor: '#011B25'}}>
      <Bar data={data} options={options} />
      {console.log("ChartJS -- ok"+data.datasets[0].data)}
    </div>
  );
}


export default BarChart;