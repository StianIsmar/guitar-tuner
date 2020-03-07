import React, { Component } from "react";
import "../css/VisualiseTuning.css";

class VisualiseTuning extends Component {
  constructor(props) {
    super(props);
  }
  Svg = () => {
    if (this.props.tighten) {
      // Tighten
      var diff =
        parseFloat(this.props.actualFreq) / parseFloat(this.props.desiredFreq);
      // The closer to 1.0, the less you need to tune the guitar
      console.log(0.6 * diff * this.props.recorderWidth);
      var lengthOfBar = 0.6 * this.props.recorderWidth - 34;
      var halfLength = lengthOfBar / 2;
      var coordinate = halfLength - (1 - diff) * halfLength;
    }
    if (!this.props.tighten) {
      // Tighten
      var diff =
        parseFloat(this.props.actualFreq) / parseFloat(this.props.desiredFreq);
      // The closer to 1.0, the less you need to tune the guitar
      console.log(0.6 * diff * this.props.recorderWidth);
      var lengthOfBar = 0.6 * this.props.recorderWidth - 34;
      var halfLength = lengthOfBar / 2;
      var coordinate = halfLength + (1 - diff) * halfLength;
    }

    return (
      <div>
        {0.6 * this.props.recorderWidth}
        <div>In tune</div>
        <div className="flex-col-container">
          <div className="row_visualisation">Tighten</div>
          <svg height="20" width={0.6 * this.props.recorderWidth}>
            <rect
              id="blue-rectangle"
              x={coordinate}
              width={17}
              height="20"
              style={{ fill: "#23395B" }}
              rx="1"
            />
            <rect
              id="red-rectangle"
              x={halfLength + 15 / 2}
              width={2}
              height="20"
              style={{ fill: "red" }}
            />
          </svg>
          <div className="row_visualisation">Loosen</div>
        </div>
      </div>
    );
  };
  render() {
    return <div>{this.Svg()}</div>;
  }
}

export default VisualiseTuning;
