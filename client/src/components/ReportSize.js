import React from "react";

class ReportSize extends React.Component {
  refCallback = element => {
    if (element) {
      this.props.getSize(element.getBoundingClientRect());
    }
  };

  render() {
    return <div ref={this.refCallback}></div>;
  }
}

export default ReportSize;
