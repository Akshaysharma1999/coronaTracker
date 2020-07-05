import React from "react";
import { Select } from "semantic-ui-react";

class SelectState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options: [] };
  }
  returnOptions = () => {
    if (this.props.data !== undefined) {
      let newArr = [];
      this.props.data.data.map((obj, i) => {
        newArr.push({ value: obj.statecode, text: obj.state });
      });
      return newArr;
    }
  };
  render() {
    console.log(this.props);
    return (
      <Select
        placeholder="Select State"
        options={this.returnOptions()}
        onChange={(e, d) => this.props.selectStateFun(d)}
      ></Select>
    );
  }
}

export default SelectState;
