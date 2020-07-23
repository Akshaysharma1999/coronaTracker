import React from "react";
import { Container, Statistic, Card } from "semantic-ui-react";
import CountUp from "react-countup";
import { fetchData, stateTimeData } from "./api";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import SelectState from "./components/SelectState";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [], selectedState: null, stateTimeDataVar: null };
  }
  componentDidMount = async () => {
    let data = await fetchData();
    let stateTimeDataVar = await stateTimeData();
    this.setState({ data: data, stateTimeDataVar: stateTimeDataVar });
  };
  renderLineChartInfected = (data) => {
    if (this.state.selectedState !== null) {
      return (
        <LineChart
          data={{
            data: data,
            key: "stateconfirmed",
          }}
        />
      );
    } else if (data.length !== 0) {
      return (
        <LineChart
          data={{
            data: this.state.data.cases_time_series,
            key: "dailyconfirmed",
          }}
        />
      );
    }
  };
  renderLineChartCured = (data) => {
    if (this.state.selectedState !== null) {
      return (
        <LineChart
          data={{
            data: data,
            key: "staterecovered",
          }}
        />
      );
    } else if (data.length !== 0) {
      return (
        <LineChart
          data={{
            data: this.state.data.cases_time_series,
            key: "dailyrecovered",
          }}
        />
      );
    }
  };
  renderLineChartDeaths = (data) => {
    if (this.state.selectedState !== null) {
      return (
        <LineChart
          data={{
            data: data,
            key: "statedeceased",
          }}
        />
      );
    } else if (data.length !== 0) {
      return (
        <LineChart
          data={{
            data: this.state.data.cases_time_series,
            key: "dailydeceased",
          }}
        />
      );
    }
  };
  renderLineChartTests = (data) => {
    if (this.state.selectedState !== null) {
      return (
        <LineChart
          data={{
            data: data,
            key: "statetested",
          }}
        />
      );
    } else if (data.length !== 0) {
      return (
        <LineChart
          data={{
            data: this.state.data.tested,
            key: "totalsamplestested",
          }}
        />
      );
    }
  };

  renderBarChart = () => {
    if (this.state.data.length !== 0 && this.state.selectedState !== null) {
      // console.log(this.state.data.statewise);
      let arr = [];
      return this.state.data.statewise.map((e, i) => {
        if (e.statecode === this.state.selectedState) {
          arr.push(e);
          return (
            <BarChart
              data={{
                data: arr,
              }}
            />
          );
        }
      });
    } else if (this.state.data.length !== 0) {
      let arr = [];

      arr.push(this.state.data.statewise[0]);
      return (
        <BarChart
          data={{
            data: arr,
          }}
        />
      );
    }
  };
  setTotalValue = () => {
    if (
      this.state.data !== undefined &&
      this.state.data.statewise !== undefined
    ) {
      return this.state.data.statewise[0].confirmed;
    } else {
      return 0;
    }
  };
  setCuredValue = () => {
    if (
      this.state.data !== undefined &&
      this.state.data.statewise !== undefined
    ) {
      return this.state.data.statewise[0].recovered;
    } else {
      return 0;
    }
  };
  setDeathValue = () => {
    if (
      this.state.data !== undefined &&
      this.state.data.statewise !== undefined
    ) {
      return this.state.data.statewise[0].deaths;
    } else {
      return 0;
    }
  };
  setActiveValue = () => {
    if (
      this.state.data !== undefined &&
      this.state.data.statewise !== undefined
    ) {
      return this.state.data.statewise[0].active;
    } else {
      return 0;
    }
  };
  setStateData = () => {
    if (
      this.state.data !== undefined &&
      this.state.data.statewise !== undefined
    ) {
      return {
        data: this.state.data.statewise,
        timeData: this.state.stateTimeDataVar,
      };
    }
  };
  selectState = (selectedState) => {
    this.setState({ selectedState: selectedState.value });
  };

  setDailyConfirmed = () => {
    if (
      this.state.selectedState !== null &&
      this.state.stateTimeDataVar !== undefined
    ) {
      if (this.state.stateTimeDataVar[this.state.selectedState] === undefined) {
        return 0;
      }
      let keys = Object.keys(
        this.state.stateTimeDataVar[this.state.selectedState]
      );
      let last = keys[keys.length - 1];
      if (
        this.state.stateTimeDataVar[this.state.selectedState][last].delta ===
        undefined
      ) {
        return 0;
      }
      return isNaN(
        this.state.stateTimeDataVar[this.state.selectedState][last].delta
          .confirmed
      )
        ? 0
        : this.state.stateTimeDataVar[this.state.selectedState][last].delta
            .confirmed;
    } else if (
      this.state.data !== undefined &&
      this.state.data.statewise !== undefined &&
      this.state.stateTimeDataVar !== null
    ) {
      let keys = Object.keys(this.state.stateTimeDataVar["TT"]);
      let last = keys[keys.length - 1];
      if (this.state.stateTimeDataVar["TT"][last].delta === undefined) {
        return 0;
      }
      return isNaN(this.state.stateTimeDataVar["TT"][last].delta.confirmed)
        ? 0
        : this.state.stateTimeDataVar["TT"][last].delta.confirmed;
    } else {
      return 0;
    }
  };
  setDailyCured = () => {
    if (
      this.state.selectedState !== null &&
      this.state.stateTimeDataVar !== undefined
    ) {
      if (this.state.stateTimeDataVar[this.state.selectedState] === undefined) {
        return 0;
      }
      let keys = Object.keys(
        this.state.stateTimeDataVar[this.state.selectedState]
      );
      let last = keys[keys.length - 1];
      if (
        this.state.stateTimeDataVar[this.state.selectedState][last].delta ===
        undefined
      ) {
        return 0;
      }
      return isNaN(
        this.state.stateTimeDataVar[this.state.selectedState][last].delta
          .recovered
      )
        ? 0
        : this.state.stateTimeDataVar[this.state.selectedState][last].delta
            .recovered;
    } else if (
      this.state.data !== undefined &&
      this.state.data.statewise !== undefined &&
      this.state.stateTimeDataVar !== null
    ) {
      let keys = Object.keys(this.state.stateTimeDataVar["TT"]);
      let last = keys[keys.length - 1];
      if (this.state.stateTimeDataVar["TT"][last].delta === undefined) {
        return 0;
      }
      return isNaN(this.state.stateTimeDataVar["TT"][last].delta.recovered)
        ? 0
        : this.state.stateTimeDataVar["TT"][last].delta.recovered;
    } else {
      return 0;
    }
  };
  setDailyDeaths = () => {
    if (
      this.state.selectedState !== null &&
      this.state.stateTimeDataVar !== undefined
    ) {
      if (this.state.stateTimeDataVar[this.state.selectedState] === undefined) {
        return 0;
      }
      let keys = Object.keys(
        this.state.stateTimeDataVar[this.state.selectedState]
      );
      let last = keys[keys.length - 1];
      if (
        this.state.stateTimeDataVar[this.state.selectedState][last].delta ===
        undefined
      ) {
        return 0;
      }
      return isNaN(
        this.state.stateTimeDataVar[this.state.selectedState][last].delta
          .deceased
      )
        ? 0
        : this.state.stateTimeDataVar[this.state.selectedState][last].delta
            .deceased;
    } else if (
      this.state.data !== undefined &&
      this.state.data.statewise !== undefined
    ) {
      let keys = Object.keys(this.state.stateTimeDataVar["TT"]);
      let last = keys[keys.length - 1];
      if (this.state.stateTimeDataVar["TT"][last].delta === undefined) {
        return 0;
      }
      return isNaN(this.state.stateTimeDataVar["TT"][last].delta.deceased)
        ? 0
        : this.state.stateTimeDataVar["TT"][last].delta.deceased;
    } else {
      return 0;
    }
  };
  renderActiveDiff = (obj) => {
    if (obj.deltaconfirmed - obj.deltadeaths - obj.deltarecovered < 0) {
      return obj.deltaconfirmed - obj.deltadeaths - obj.deltarecovered;
    } else {
      return `+${obj.deltaconfirmed - obj.deltadeaths - obj.deltarecovered}`;
    }
  };
  renderActiveDiffTotal = () => {
    if (
      this.setDailyConfirmed() - this.setDailyCured() - this.setDailyDeaths() <
      0
    ) {
      return parseInt(
        this.setDailyConfirmed() - this.setDailyCured() - this.setDailyDeaths()
      ).toLocaleString("en");
    } else {
      return `+${parseInt(
        this.setDailyConfirmed() - this.setDailyCured() - this.setDailyDeaths()
      ).toLocaleString("en")}`;
    }
  };
  renderCharts = () => {
    if (this.state.selectedState !== null) {
      return (
        <>
          <Card.Group stackable={true} itemsPerRow={2}>
            <Card raised>
              {this.renderLineChartInfected(
                this.state.stateTimeDataVar[this.state.selectedState]
              )}
            </Card>
            <Card raised>
              {this.renderLineChartCured(
                this.state.stateTimeDataVar[this.state.selectedState]
              )}
            </Card>
            <Card raised>
              {this.renderLineChartDeaths(
                this.state.stateTimeDataVar[this.state.selectedState]
              )}
            </Card>
            <Card raised>
              {this.renderLineChartTests(
                this.state.stateTimeDataVar[this.state.selectedState]
              )}
            </Card>
          </Card.Group>
          <Card.Group>
            <Card raised centered={true} fluid>
              {this.renderBarChart()}
            </Card>
          </Card.Group>
        </>
      );
    } else {
      return (
        <>
          <Card.Group stackable={true} itemsPerRow={2}>
            <Card raised>{this.renderLineChartInfected(this.state.data)}</Card>
            <Card raised>{this.renderLineChartCured(this.state.data)}</Card>
            <Card raised>{this.renderLineChartDeaths(this.state.data)}</Card>
            <Card raised>{this.renderLineChartTests(this.state.data)}</Card>
          </Card.Group>
          <Card.Group>
            <Card raised centered={true} fluid>
              {this.renderBarChart()}
            </Card>
          </Card.Group>
        </>
      );
    }
  };
  renderStats = () => {
    if (this.state.selectedState !== null) {
      return this.state.data.statewise.map((obj) => {
        // console.log(obj);
        if (obj.statecode === this.state.selectedState) {
          return (
            <Card.Group stackable={true} itemsPerRow={"4"}>
              <Card raised color="blue">
                <Statistic color="blue">
                  <Statistic.Value>
                    <CountUp
                      start={0}
                      end={obj.confirmed}
                      duration={1}
                      separator=","
                    />
                  </Statistic.Value>
                  <Statistic size="mini">
                    {"+" +
                      parseInt(this.setDailyConfirmed()).toLocaleString("en")}
                  </Statistic>
                  <Statistic.Label>Total Cases</Statistic.Label>
                </Statistic>
              </Card>
              <Card raised color="violet">
                <Statistic color="violet">
                  <Statistic.Value>
                    <CountUp
                      start={0}
                      end={obj.active}
                      duration={1}
                      separator=","
                    />
                  </Statistic.Value>
                  <Statistic size="mini">
                    {this.renderActiveDiff(obj)}
                  </Statistic>
                  <Statistic.Label>Active</Statistic.Label>
                </Statistic>
              </Card>
              <Card raised color="green">
                <Statistic color="green">
                  <Statistic.Value>
                    <CountUp
                      start={0}
                      end={obj.recovered}
                      duration={1}
                      separator=","
                    />
                  </Statistic.Value>
                  <Statistic size="mini">
                    {"+" + parseInt(this.setDailyCured()).toLocaleString("en")}
                  </Statistic>
                  <Statistic.Label>Cured</Statistic.Label>
                </Statistic>
              </Card>
              <Card raised color="red">
                <Statistic color="red">
                  <Statistic.Value>
                    <CountUp
                      start={0}
                      end={obj.deaths}
                      duration={1}
                      separator=","
                    />
                  </Statistic.Value>
                  <Statistic size="mini">
                    {"+" + parseInt(this.setDailyDeaths()).toLocaleString("en")}
                  </Statistic>
                  <Statistic.Label>Deaths</Statistic.Label>
                </Statistic>
              </Card>
            </Card.Group>
          );
        }
      });
    } else {
      console.log(this.state);
      return (
        <Card.Group stackable={true} itemsPerRow={"4"}>
          <Card raised color="blue">
            <Statistic color="blue">
              <Statistic.Value>
                <CountUp
                  start={0}
                  end={this.setTotalValue()}
                  duration={1}
                  separator=","
                />
              </Statistic.Value>
              <Statistic size="mini">
                {"+" + parseInt(this.setDailyConfirmed()).toLocaleString("en")}
              </Statistic>
              <Statistic.Label>Total Cases</Statistic.Label>
            </Statistic>
          </Card>
          <Card raised color="violet">
            <Statistic color="violet">
              <Statistic.Value>
                <CountUp
                  start={0}
                  end={this.setActiveValue()}
                  duration={1}
                  separator=","
                />
              </Statistic.Value>
              <Statistic size="mini"> {this.renderActiveDiffTotal()}</Statistic>
              <Statistic.Label>Active</Statistic.Label>
            </Statistic>
          </Card>
          <Card raised color="green">
            <Statistic color="green">
              <Statistic.Value>
                <CountUp
                  start={0}
                  end={this.setCuredValue()}
                  duration={1}
                  separator=","
                />
              </Statistic.Value>

              <Statistic size="mini" color="green">
                {"+" + parseInt(this.setDailyCured()).toLocaleString("en")}
              </Statistic>

              <Statistic.Label>Cured</Statistic.Label>
            </Statistic>
          </Card>
          <Card raised color="red">
            <Statistic color="red">
              <Statistic.Value>
                <CountUp
                  start={0}
                  end={this.setDeathValue()}
                  duration={1}
                  separator=","
                />
              </Statistic.Value>
              <Statistic size="mini">
                {"+" + parseInt(this.setDailyDeaths()).toLocaleString("en")}
              </Statistic>
              <Statistic.Label>Deaths</Statistic.Label>
            </Statistic>
          </Card>
        </Card.Group>
      );
    }
  };
  render() {
    // console.log(this.state)
    return (
      <Container textAlign="center">
        <img alt="goCorona" src="./corona.png" style={{ maxWidth: "100%" }} />
        {this.renderStats()}
        <br />
        <SelectState
          data={this.setStateData()}
          selectStateFun={this.selectState}
        />
        {this.renderCharts()}
        <br />
      </Container>
    );
  }
}

export default App;
