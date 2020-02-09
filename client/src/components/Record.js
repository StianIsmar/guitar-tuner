import React, { Component } from 'react';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import MicRecorder from 'mic-recorder-to-mp3';
import TransmitAudio from './TransmitAudio'
import "../css/Record.css"

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
                    setTimeout(() => {
                        this.stop();
                    }, 2000);

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
            <div className="record-wrapper row">
                <header>
                    <h1>
                        Welcome to GuitarTuner.
                    </h1>
                    <h3>Select the string you are tuning</h3>
                </header>


                <div className="select-string row">
                    <ButtonGroup className="mb-3" aria-label="Basic example">
                        <Button variant="secondary">E<sub>2</sub></Button>
                        <Button variant="secondary">A</Button>
                        <Button variant="secondary">D</Button>
                        <Button variant="secondary">G</Button>
                        <Button variant="secondary">B</Button>
                        <Button variant="secondary">E<sub>4</sub></Button>


                    </ButtonGroup>
                </div>
                <div className="record-button row">
                    <Button variant="danger" onClick={this.start} disabled={this.state.isRecording}>Record</Button>
                    <Button variant="danger" onClick={this.stop} disabled={!this.state.isRecording}>Stop</Button>
                </div>
                <div className="playback row">
                    <audio src={this.state.blobURL} controls="controls" />
                </div>
                <TransmitAudio ref={this.transmitAudioElement} />
            </div >

        );
    }
}

export default Record;
