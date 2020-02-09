import React from 'react';

class TransmitAudio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordedBlob: [],
            transmitted: '',
            success: ''
        };
    }

    updateState = (newState) => {
        console.log("This is the file which is being sent in the POST request: ", newState)
        this.uploadFile(newState)
        //this.postTest()
    }

    postTest() {
        fetch('http://127.0.0.1:5000/testpost', {
            // content-type header should not be specified!
            method: 'POST',
            name: "stianI",
        })
            .then(response => response.json())
            .then(success => {
                // Do something with the successful response
            })
            .catch(error => console.log(error)
            );
    }

    uploadFile(blob, blobUrl) {
        console.log("BLOB SENT: ", blob)
        // var blob = new Blob([blob])
        /*
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            var base64data = reader.result;
          */

        var fd = new FormData(); // Creating the form for the POST
        fd.append('base64data', blob,Blob);
        console.log('Blob appended')

        fetch('http://127.0.0.1:5000/audio_record', {
            // content-type header should not be specified!
            method: 'POST',
            body: fd,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data'
        }).then(function (response) {
            return (response.text())
        }).then(function (text) {
            console.log(text) // The text the endpoint returns
        })
            .catch(error => console.log(error)
            );


    }

    /*
        var http = new XMLHttpRequest();
          http.open('POST', sttEndpoint, true);
          http.setRequestHeader('Content-type', 'audio/webm;codecs=opus');
          http.onreadystatechange = function() {
            if (http.readyState === 4 && http.status === 200 && http.responseText) {
              Api.setResponsePayload(http.responseText);
            }
          };
          // Send request
          http.send(blob);
          chunks = [];
          };
          */
    render() {
        return (
            <div>
                {this.props.recordingData}
            </div>
        );
    }
}

export default TransmitAudio;