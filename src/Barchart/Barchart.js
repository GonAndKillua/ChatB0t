import React from "react";
import { Bar } from "react-chartjs-2";

const Barchat = () => {
  return (
    <div>
      <Bar
        data={{
          labels: [
            "Realistic",
            "Investigative",
            "Artistic",
            "Social",
            "Enterprising",
            "Conventional",
          ],
          datasets: [
            {
              label: "RIASEC Score",
              data: [12, 19, 10, 9, 2, 8],
              axis: "y",
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={600}
        width={800}
        options={{
          indexAxis: "y",
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};
export default Barchat;
