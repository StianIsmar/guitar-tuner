import React from 'react';
import Button from 'react-bootstrap/Button';
import { ReactMic } from 'react-mic';
import TransmitAudio from './TransmitAudio'


// Class to take in the recording for the guitar string
class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            recordedBlob: [],
            finishedRecording: false
        };
        // This binding is necessary to make `this` work in the callback
        this.stopRecording = this.stopRecording.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.onStop = this.onStop.bind(this)
        this.transmitAudioElement = React.createRef();


    }
    stopRecording = () => {
        this.setState(state => ({
            record: !state.record
            //record: false
        }));
    }

    startRecording() {
        // Record and save 10 seconds of audio
        this.setState(state => ({
            //record: !state.record
            record: true
        }));
        // Record for 10 seconds before setting the record state to false
        setTimeout(() => {
            this.stopRecording();
        }, 2000);
    }



    onData(recordedBlob) {
        // console.log('chunk of real-time data is: ', recordedBlob);
        var recordings = Array()
        recordings.push(recordedBlob)
    }

    // callback to execute when audio stops recording
    onStop(recordedBlob) {
        console.log("ONSTOP CALLED")
        this.setState(state => ({
            recordedBlob: this.state.recordedBlob.push(recordedBlob),
            finishedRecording: true
        }),
        console.log("STate IN PARENT: ", this.state.recordedBlob),
        this.transmitAudioElement.current.updateState(this.state.recordedBlob)
        )
    
        //this.setState(state => ({recordedBlob: "UPDATED BLOB"}))
        // Need to send this recordedBlob to another compoenent
    }
    render() {
        return (
            <div className="Record">
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    onData={this.onData}
                    strokeColor="#F28F3B"
                    backgroundColor="#588B8B" />
                <p className="Info">
                    Click to record the next 10 seconds
                </p>
                <Button onClick={this.startRecording} variant="danger">Start recording</Button>
                <TransmitAudio ref={this.transmitAudioElement} />


                {this.state.finishedRecording ? (
                    <TransmitAudio recordingData={this.state.recordedBlob} />

                ) : (
                        <div> Audio not recorded... </div>
                    )}



            </div>
        );
    }
}

export default Record;
