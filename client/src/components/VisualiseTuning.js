import React, { Component } from "react";
import "../css/VisualiseTuning.css";

class VisualiseTuning extends Component {
  constructor(props) {
    super(props);
  }
  Svg = () => {
    return (
      <div>
        <div>In tune</div>
        <div className="flex-col-container">
          <div style={{ flex: "0.2" }}>Tighten</div>

          <svg style={{ flex: "0.6" }} height="20" width="80%">
            <rect
              id="blue-rectangle"
              x={200}
              width="10%"
              height="20"
              style={{ fill: "#23395B" }}
            />
          </svg>
          <div style={{ flex: "0.2" }}>Loosen</div>
        </div>
      </div>
    );
  };
  render() {
    return <div>{this.Svg()}</div>;
  }
}

export default VisualiseTuning;
