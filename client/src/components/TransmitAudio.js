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
        console.log("This is the file: ", newState)
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


    uploadFile(file) {
        var form = new FormData();
        form.append('file',file)
        form.append('title',"Guitar recording")
        fetch('http://127.0.0.1:5000/audio_record', {
            // content-type header should not be specified!
            method: 'POST',
            body: form
        }).then(function (response){
            return (response.text())
        }).then(function(text){
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