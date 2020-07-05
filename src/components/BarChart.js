import React from "react";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          maxTicksLimit: 4,
          callback(data) {
            return data / 1000 + "K";
          },
        },
        gridLines: {
          color: "rgb(0,0,0)",
          drawOnChartArea: false,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          color: "rgb(0,0,0)",
          drawOnChartArea: false,
        },
      },
    ],
  },
};

class BarChart extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <Bar
        data={{
          labels: this.props.data.data.map((data) => data.state),
          datasets: [
            {
              data: this.props.data.data.map((data) => data.confirmed),
              label: "Confirmed",
              borderColor: "#3333ff",
              backgroundColor: "rgb(239,247,255)",
              borderWidth: 1,
            },
            {
              data: this.props.data.data.map((data) => data.recovered),
              label: "Recovered",
              borderColor: "green",
              backgroundColor: "rgb(228,244,232)",
              borderWidth: 1,
            },
            {
              data: this.props.data.data.map((data) => data.deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,224,230)",
              borderWidth: 1,
            },
          ],
        }}
        options={options}
      />
    );
  }
}

export default BarChart;
