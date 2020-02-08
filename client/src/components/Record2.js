import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { ReactMic } from 'react-mic';
import TransmitAudio from './TransmitAudio'
import { ReactMediaRecorder } from "react-media-recorder";



// Class to take in the recording for the guitar string
class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            blobUrl: {},
            audio: ''
        };
        this.stopRecording = this.stopRecording.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.record = this.record.bind(this)
        this.recordAudio = this.recordAudio.bind(this)
        this.sleep = this.sleep.bind(this)

    }
    stopRecording = () => {
        this.setState(state => ({
            record: !state.record
            //record: false
        }));
    }

    startRecording() {
        console.log("Started...")
        // Record and save 10 seconds of audio
        this.setState(state => ({
            record: !state.record
            //record: true
        }));
        // Record for 2 seconds before setting the record state to false
        setTimeout(() => {
            this.stopRecording();
        }, 1000);
    }





    // callback to execute when audio stops recording
    /*onStop(recordedBlob) {
        this.setState(state => ({
            recordedBlob: this.state.recordedBlob.push(recordedBlob),
            finishedRecording: true
        }),
            console.log("STate IN PARENT: ", this.state.recordedBlob),
            console.log("Recorded blob to be handled:", recordedBlob),
            this.transmitAudioElement.current.updateState(recordedBlob)
        )

    }*/

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.blobUrl !== prevProps.blobUrl) {
            this.fetchData(this.props.blobUrl);
            console.log(this.props.blobUrl)
        }
    }


    upload(mediaBlob) {
        if (this.state.audio != null) {
            console.log(mediaBlob)
            var reader = new FileReader();
            reader.readAsDataURL(mediaBlob.blob);
            reader.onloadend = function () {
                var base64data = reader.result;

                var fd = new FormData(); // Creating the form for the POST
                fd.append('base64data', base64data);

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
        }


    }
    upload1(mediaBlob) {
        if (this.state.audio != null) {
            //load blob
            var xhr_get_audio = new XMLHttpRequest();
            xhr_get_audio.open('GET', mediaBlob, true);
            xhr_get_audio.responseType = 'blob';
            xhr_get_audio.onload = function (e) {
                if (this.status == 200) {
                    var blob = this.response;
                    //send the blob to the server
                    var xhr_send = new XMLHttpRequest();
                    var filename = new Date().toISOString();
                    xhr_get_audio.onload = function (e) {
                        if (this.readyState === 4) {
                            console.log("Server returned: ", e.target.responseText);
                        }
                    };
                    var fd = new FormData();
                    fd.append("audio_data", blob, filename);
                    xhr_send.open("POST", "http://127.0.0.1:5000/audio_record",
                        true);
                    xhr_send.send(fd);
                }
            };
            xhr_get_audio.send();
        }
    }

    record() {
        (async () => {
            const recorder = await this.recordAudio();
            recorder.start();
            await this.sleep(3000);
            const audio = await recorder.stop();
            audio.play();
        })();

    }
    function recordAudio () {
        new Promise(async resolve => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            start = () => mediaRecorder.start();

            stop = () =>
                new Promise(resolve => {
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        const play = () => audio.play();
                        resolve({ audioBlob, audioUrl, play });
                    });

                    mediaRecorder.stop();
                });

            resolve({ start, stop });
        });
    }

    sleep(time){ new Promise(resolve => setTimeout(resolve, time));}






    render() {
        return (
            <div className="Record">
                <p className="Info">
                    Click to record the next 10 seconds
                </p>
                <button onClick={this.record}></button>


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
