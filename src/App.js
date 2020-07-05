import React from "react";
import { Container, Segment, Statistic, Card, Image } from "semantic-ui-react";
import CountUp from "react-countup";
import { fetchData, stateTimeData } from "./api";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import SelectState from "./components/SelectState";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [], selectedState: null };
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
  renderCharts = () => {
    if (this.state.selectedState !== null) {
      return (
        <>
          <Card.Group stackable={true} itemsPerRow={2}>
            <Card>
              {this.renderLineChartInfected(
                this.state.stateTimeDataVar[this.state.selectedState]
              )}
            </Card>
            <Card>
              {this.renderLineChartCured(
                this.state.stateTimeDataVar[this.state.selectedState]
              )}
            </Card>
            <Card>
              {this.renderLineChartDeaths(
                this.state.stateTimeDataVar[this.state.selectedState]
              )}
            </Card>
            <Card>
              {this.renderLineChartTests(
                this.state.stateTimeDataVar[this.state.selectedState]
              )}
            </Card>
            <Card>{this.renderBarChart()}</Card>
          </Card.Group>
        </>
      );
    } else {
      return (
        <>
          <Card.Group stackable={true} itemsPerRow={2}>
            <Card>{this.renderLineChartInfected(this.state.data)}</Card>
            <Card>{this.renderLineChartCured(this.state.data)}</Card>
            <Card>{this.renderLineChartDeaths(this.state.data)}</Card>
            <Card>{this.renderLineChartTests(this.state.data)}</Card>
            <Card>{this.renderBarChart()}</Card>
          </Card.Group>
        </>
      );
    }
  };
  renderStats = () => {
    if (this.state.selectedState !== null) {
      return this.state.data.statewise.map((obj) => {
        if (obj.statecode === this.state.selectedState) {
          return (
            <Card.Group stackable={true} itemsPerRow={"4"}>
              <Card color="blue">
                <Statistic>
                  <Statistic.Value>
                    <CountUp
                      start={0}
                      end={obj.confirmed}
                      duration={1}
                      separator=","
                    />
                  </Statistic.Value>
                  <Statistic.Label>Total Cases</Statistic.Label>
                </Statistic>
              </Card>
              <Card color="violet">
                <Statistic>
                  <Statistic.Value>
                    <CountUp
                      start={0}
                      end={obj.active}
                      duration={1}
                      separator=","
                    />
                  </Statistic.Value>
                  <Statistic.Label>Active</Statistic.Label>
                </Statistic>
              </Card>
              <Card color="green">
                <Statistic>
                  <Statistic.Value>
                    <CountUp
                      start={0}
                      end={obj.recovered}
                      duration={1}
                      separator=","
                    />
                  </Statistic.Value>
                  <Statistic.Label>Cured</Statistic.Label>
                </Statistic>
              </Card>
              <Card color="red">
                <Statistic>
                  <Statistic.Value>
                    <CountUp
                      start={0}
                      end={obj.deaths}
                      duration={1}
                      separator=","
                    />
                  </Statistic.Value>
                  <Statistic.Label>Deaths</Statistic.Label>
                </Statistic>
              </Card>
            </Card.Group>
          );
        }
      });
    } else {
      return (
        <Card.Group stackable={true} itemsPerRow={"4"}>
          <Card color="blue">
            <Statistic>
              <Statistic.Value>
                <CountUp
                  start={0}
                  end={this.setTotalValue()}
                  duration={1}
                  separator=","
                />
              </Statistic.Value>
              <Statistic.Label>Total Cases</Statistic.Label>
            </Statistic>
          </Card>
          <Card color="violet">
            <Statistic>
              <Statistic.Value>
                <CountUp
                  start={0}
                  end={this.setActiveValue()}
                  duration={1}
                  separator=","
                />
              </Statistic.Value>
              <Statistic.Label>Active</Statistic.Label>
            </Statistic>
          </Card>
          <Card color="green">
            <Statistic>
              <Statistic.Value>
                <CountUp
                  start={0}
                  end={this.setCuredValue()}
                  duration={1}
                  separator=","
                />
              </Statistic.Value>
              <Statistic.Label>Cured</Statistic.Label>
            </Statistic>
          </Card>
          <Card color="red">
            <Statistic>
              <Statistic.Value>
                <CountUp
                  start={0}
                  end={this.setDeathValue()}
                  duration={1}
                  separator=","
                />
              </Statistic.Value>
              <Statistic.Label>Deaths</Statistic.Label>
            </Statistic>
          </Card>
        </Card.Group>
      );
    }
  };
  render() {
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
