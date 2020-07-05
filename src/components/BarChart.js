import React from "react";
import { Bar } from "react-chartjs-2";

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
              backgroundColor: "blue",
              fill: true,
            },
            {
              data: this.props.data.data.map((data) => data.recovered),
              label: "Recovered",
              backgroundColor: "green",
              fill: true,
            },
            {
              data: this.props.data.data.map((data) => data.deaths),
              label: "Deaths",
              backgroundColor: "red",
              fill: true,
            },
          ],
        }}
      />
    );
  }
}

export default BarChart;
