import React from "react";
import { Chart, registerables } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables);

function InstructorChart({ courses }) {
  const [currChart, setCurrentChart] = useState("students");
  function getRandomColors(numColors) {
    let colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 100);
      const lightness = Math.floor(Math.random() * 100);
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
  }

  //   chart data1
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };
  //   chart data2
  const chartDataIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: currChart.toUpperCase(),
        color: "white",
      },
    },
  };
  return (
    <div className="flex-grow space-y-6 rounded-md bg-richBlack-700 p-6">
      <h3 className="text-xl font-bold">Visualize</h3>
      <button
        autoFocus={true}
        className="mx-2 rounded bg-opacity-50 px-2 py-1 text-yellow-50 focus:bg-richBlack-600"
        onClick={() => setCurrentChart("students")}
      >
        Students
      </button>
      <button
        className="mx-2 rounded bg-opacity-50 px-2 py-1 text-yellow-50 focus:bg-richBlack-600"
        onClick={() => setCurrentChart("income")}
      >
        Income
      </button>
      <div className="mx-auto max-w-xs lg:max-w-sm">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartDataIncome}
          options={options}
        />
      </div>
    </div>
  );
}

export default InstructorChart;
