import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import ButtonGroup from "react-bootstrap/Button";
import MicRecorder from "mic-recorder-to-mp3";
import TransmitAudio from "./TransmitAudio";
import "../css/Record.css";
import StringButtons from "./StringButtons";

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
      actualFreq: ""
    };
    this.transmitAudioElement = React.createRef();
  }

  // Called when user clicks record button
  start = () => {
    if (this.state.button_pressed === "") {
      this.setState({ falseCondition: !this.state.falseCondition });
      console.log("Button_pressed is empty");
    } else if (this.state.isBlocked) {
      console.log("Permission Denied");
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
      .catch(e => console.log("eEEEE", e));
  };

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  stringButton = stringName => {
    console.log(stringName, "Pressed");
    this.setState({ button_pressed: stringName, falseCondition: false }, () => {
      console.log(this.state.button_pressed);
    }); // String is selected by the user
  };

  setShow = bool => {
    this.setState({ falseCondition: bool });
  };

  tightenOrLoosen = (tighten, desiredFreq, actualFreq, message) => {
    if (tighten === false) {
      tighten = "";
    }

    this.setState({
      returnMessage: message,
      actualFreq: actualFreq,
      desiredFreq: desiredFreq
    });
    console.log("This.state");
    console.log(
      this.state.returnMessage,
      this.state.desiredFreq,
      this.state.actualFreq
    );
  };

  render() {
    return (
      <div className="record-wrapper row">
        <header>
          <h1>Welcome to GuitarTuner</h1>
          <h3>Select the string you are tuning</h3>
        </header>

        <div className="select-string row">
          <StringButtons
            button_pressed={this.state.button_pressed}
            false_condition={this.state.falseCondition}
            stringButton={this.stringButton}
          ></StringButtons>
        </div>
        <div className="record-button row">
          <Button
            variant="danger"
            onClick={this.start}
            disabled={this.state.isRecording}
          >
            Record
          </Button>
          <Button
            variant="danger"
            onClick={this.stop}
            disabled={!this.state.isRecording}
          >
            Stop
          </Button>
        </div>

        <div className="playback row">
          <audio src={this.state.blobURL} controls="controls" />
        </div>
        <TransmitAudio
          ref={this.transmitAudioElement}
          tightenOrLoosen={this.tightenOrLoosen}
        />
        <div>{this.state.actualFreq}</div>
        <h3>{this.state.returnMessage}</h3>
      </div>
    );
  }
}
export default Record;
