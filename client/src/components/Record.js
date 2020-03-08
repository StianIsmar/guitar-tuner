import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import ButtonGroup from "react-bootstrap/Button";
import MicRecorder from "mic-recorder-to-mp3";
import TransmitAudio from "./TransmitAudio";
import "../css/Record.css";
import StringButtons from "./StringButtons";
import VisualiseTuning from "./VisualiseTuning";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      button_pressed: "",
      recorded: false,
      falseCondition: false,
      returnMessage: "",
      desiredFreq: "",
      actualFreq: "",
      tighten: "",
      recorderWidth: ""
    };
    this.transmitAudioElement = React.createRef();
  }

  // Called when user clicks record button
  start = () => {
    if (this.state.button_pressed === "") {
      this.setState({ falseCondition: !this.state.falseCondition });
      // Button_pressed is empty
    } else if (this.state.isBlocked) {
      // Permission Denied
    } else {
      this.setState({ falseCondition: false });
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
          setTimeout(() => {
            this.stop();
          }, 2000);
        })
        .catch(e => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        // Send to transmitAudioeElement component
        this.transmitAudioElement.current.uploadFile(
          blob,
          blobURL,
          this.state.button_pressed
        );
        this.setState({ blobURL, isRecording: false, recorded: true });
      })
      .catch(e => console.log(console.error(e)));
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        this.setState({ isBlocked: false });
      },
      () => {
        this.setState({ isBlocked: true });
      }
    );
  }

  stringButton = stringName => {
    this.setState({ button_pressed: stringName, falseCondition: false }); // String is selected by the user
  };

  tightenOrLoosen = (tighten, desiredFreq, actualFreq, message) => {
    this.setState({
      returnMessage: message,
      actualFreq: actualFreq,
      desiredFreq: desiredFreq,
      tighten: tighten
    });
  };

  revertFalseState = () => {
    this.setState({ falseCondition: false });
  };
  renderMessage = () => {
    var text = "";
    if (this.state.recorded) {
      if (this.state.tighten) {
        text = "Tighten the string";
      } else if (!this.state.tighten) {
        text = "Loosen the string";
      }
      return <h3 className="row">{text}</h3>;
    }
  };

  handleResize = e => {
    const recorderWidth = window.innerWidth;
    this.setState(prevState => {
      return {
        recorderWidth
      };
    });
  };

  componentDidMount() {
    const recorderWidth = window.innerWidth;
    this.setState({
      recorderWidth: recorderWidth
    });
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div className="record-wrapper row">
        <header>
          <h1>GuitarTuner</h1>
          <h6 className="made-with">Built using Flask and ReactJs</h6>
          <h5>Select the string you wish to tune</h5>
        </header>
        <div>
          {this.state.desiredFreq !== "" ? (
            <VisualiseTuning
              desiredFreq={this.state.desiredFreq}
              actualFreq={this.state.actualFreq}
              tighten={this.state.tighten}
              recorderWidth={this.state.recorderWidth}
              renderMessage={this.renderMessage}
            ></VisualiseTuning>
          ) : (
            <div></div>
          )}
        </div>

        <div className="select-string row">
          <StringButtons
            button_pressed={this.state.button_pressed}
            false_condition={this.state.falseCondition}
            stringButton={this.stringButton}
            revertFalseCondition={this.revertFalseState}
          ></StringButtons>
        </div>

        <div className="record-button row">
          <Button
            variant="danger"
            onClick={this.start}
            disabled={this.state.isRecording}
          >
            <span style={{ fontSize: "smaller" }}>Record</span>
          </Button>
          <Button
            btn
            btn-large
            variant="danger"
            onClick={this.stop}
            disabled={!this.state.isRecording}
          >
            <span style={{ fontSize: "smaller" }}>Stop</span>
          </Button>
        </div>

        <div className="playback row">
          <audio src={this.state.blobURL} controls="controls" />
        </div>
        <TransmitAudio
          ref={this.transmitAudioElement}
          tightenOrLoosen={this.tightenOrLoosen}
        />
      </div>
    );
  }
}
export default Record;
