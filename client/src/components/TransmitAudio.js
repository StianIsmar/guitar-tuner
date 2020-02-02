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
        uploadFile(newState)

    }
    uploadFile(file) {
        fetch('https://path/to/api', {
            // content-type header should not be specified!
            method: 'POST',
            body: file,
        })
            .then(response => response.json())
            .then(success => {
                // Do something with the successful response
            })
            .catch(error => console.log(error)
            );
    }
    render() {
        return (
            <div>
                {this.props.recordingData}
            </div>
        );
    }
}

export default TransmitAudio;