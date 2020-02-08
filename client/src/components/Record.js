import React, { Component } from 'react';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import MicRecorder from 'mic-recorder-to-mp3';
import TransmitAudio from './TransmitAudio'

const Mp3Recorder = new MicRecorder({ bitRate: 128 });


class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
        };
        this.transmitAudioElement = React.createRef();
    }


    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                // Send to transmitAudioeElement component
                this.transmitAudioElement.current.uploadFile(blob, blobURL)
                this.setState({ blobURL, isRecording: false });
            }).catch((e) => console.log("eEEEE", e));
    };

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
    }

    render() {
        return (
            <div className="Record">
                <Button variant="danger" onClick={this.start} disabled={this.state.isRecording}>Record</Button>
                <Button variant="danger" onClick={this.stop} disabled={!this.state.isRecording}>Stop</Button>
                <audio src={this.state.blobURL} controls="controls" />
                <TransmitAudio ref={this.transmitAudioElement}/>
            </div>

        );
    }
}

export default Record;
