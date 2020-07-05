import React from "react";
import { Line } from "react-chartjs-2";

class LineChart extends React.Component {
  constructor() {
    super();
    this.state = { obj: {} };
  }
  setDataSet = () => {
    let obj = {};
    if (this.props.data) {
      // console.log(this.props.data);
      if (this.props.data === undefined || this.props.data.data === undefined) {
        return obj;
      } else if (this.props.data.key === "dailydeceased") {
        obj = {
          data: this.props.data.data.map((data) => data.dailydeceased),
          label: "Daily Deaths",
          borderColor: "red",
          backgroundColor: "rgb(255,224,230)",
          fill: true,
          pointRadius: "0.1",
        };
        return obj;
      } else if (this.props.data.key === "dailyrecovered") {
        obj = {
          data: this.props.data.data.map((data) => data.dailyrecovered),
          label: "Daily Cured",
          borderColor: "green",
          backgroundColor: "rgb(228,244,232)",
          fill: true,
          pointRadius: "0.1",
        };
        return obj;
      } else if (this.props.data.key === "dailyconfirmed") {
        obj = {
          data: this.props.data.data.map((data) => data.dailyconfirmed),
          label: "Daily Infected",
          borderColor: "#3333ff",
          backgroundColor: "rgb(239,247,255)",
          fill: true,
          pointRadius: "0.1",
        };
        return obj;
      } else if (this.props.data.key === "totalsamplestested") {
        obj = {
          data: this.props.data.data.map((data) => data.totalsamplestested),
          label: "Tested",
          borderColor: "rgb(77,32,170)",
          backgroundColor: "rgb(227,226,243)",
          fill: true,
          pointRadius: "0.1",
        };
        return obj;
      } else if (this.props.data.key === "stateconfirmed") {
        obj = {
          data: Object.keys(this.props.data.data).map((key, index) => {
            return this.props.data.data[key].total.confirmed;
          }),
          label: "Total Infected",
          borderColor: "#3333ff",
          backgroundColor: "rgb(239,247,255)",
          fill: true,
          pointRadius: "0.1",
        };        
        return obj;
      } else if (this.props.data.key === "staterecovered") {
        obj = {
          data: Object.keys(this.props.data.data).map((key, index) => {
            if (this.props.data.data[key].total.recovered === undefined) {
              return 0;
            }
            return this.props.data.data[key].total.recovered;
          }),
          label: "Total Cured",
          borderColor: "green",
          backgroundColor: "rgb(228,244,232)",
          fill: true,
          pointRadius: "0.1",
        };
        return obj;
      } else if (this.props.data.key === "statedeceased") {
        obj = {
          data: Object.keys(this.props.data.data).map((key, index) => {
            if (this.props.data.data[key].total.deceased === undefined) {
              return 0;
            }
            return this.props.data.data[key].total.deceased;
          }),
          label: "Total Deaths",
          borderColor: "red",
          backgroundColor: "rgb(255,224,230)",
          fill: true,
          pointRadius: "0.1",
        };
        return obj;
      } else if (this.props.data.key === "statetested") {
        obj = {
          data: Object.keys(this.props.data.data).map((key, index) => {
            if (this.props.data.data[key].total.tested === undefined) {
              return 0;
            }
            return this.props.data.data[key].total.tested;
          }),
          label: "Total Tested",
          borderColor: "rgb(77,32,170)",
          backgroundColor: "rgb(227,226,243)",
          fill: true,
          pointRadius: "0.1",
        };
        return obj;
      }
    }
  };

  renderLabels = () => {
    if (
      this.props.data.key === "stateconfirmed" ||
      this.props.data.key === "staterecovered" ||
      this.props.data.key === "statedeceased" ||
      this.props.data.key === "statetested"
    ) {
      if (this.props.data !== undefined && this.props.data.data !== undefined) {
        return Object.keys(this.props.data.data).map((key, index) => {
          return key;
        });
      }
    } else {
      return this.props.data.data.map((data) => {
        if (this.props.data.key === "totalsamplestested") {
          return data.testedasof;
        } else {
          return data.date;
        }
      });
    }
  };
  render() {
    // console.log(this.props);
    return (
      <Line
        data={{
          labels: this.renderLabels(),
          datasets: [this.setDataSet()],
        }}
      />
    );
  }
}

export default LineChart;
