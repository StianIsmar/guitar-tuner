import React from "react";

class TransmitAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordedBlob: [],
      transmitted: "",
      success: "",
    };
  }

  updateState = (newState) => {
    this.uploadFile(newState);
  };

  uploadFile(blob, blobUrl, stringSelected) {
    var fd = new FormData(); // Creating the form for the POST
    fd.append("base64data", blob, Blob);
    var stringObj = { stringSelected: stringSelected };
    fd.append("stringSelected", JSON.stringify(stringObj));

    fetch("https://guitartuner.space/audio_record", {
      // content-type header should not be specified!
      method: "POST",
      body: fd,
      processData: false,
      contentType: false,
      enctype: "multipart/form-data",
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.tightenOrLoosen(
          res.tighten,
          res.desired_freq,
          res.actual_freq,
          res.comment
        );
      })
      .catch((error) => console.log(error));
  }

  render() {
    return <div>{this.props.recordingData}</div>;
  }
}

export default TransmitAudio;
