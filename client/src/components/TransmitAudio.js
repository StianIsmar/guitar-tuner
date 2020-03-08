import React from "react";

class TransmitAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordedBlob: [],
      transmitted: "",
      success: ""
    };
  }

  updateState = newState => {
    console.log(
      "This is the file which is being sent in the POST request: ",
      newState
    );
    this.uploadFile(newState);
  };

  uploadFile(blob, blobUrl, stringSelected) {
    console.log("BLOB SENT: ", blob);
    var fd = new FormData(); // Creating the form for the POST
    fd.append("base64data", blob, Blob);
    var stringObj = { stringSelected: stringSelected };
    fd.append("stringSelected", JSON.stringify(stringObj));
    console.log("Blob appended");

    fetch("http://127.0.0.1:5000/audio_record", {
      // content-type header should not be specified!
      method: "POST",
      body: fd,
      processData: false,
      contentType: false,
      enctype: "multipart/form-data"
    })
      .then(res => res.json())
      .then(res => {
        this.props.tightenOrLoosen(
          res.tighten,
          res.desired_freq,
          res.actual_freq,
          res.comment
        );
      })
      .catch(error => console.log(error));
  }

  render() {
    return <div>{this.props.recordingData}</div>;
  }
}

export default TransmitAudio;
