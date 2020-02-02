import React from 'react';

class TransmitAudio extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                recordedBlob: [],
                transmitted: '',
                success: ''
            };

            this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

        }


        componentWillReceiveProps(nextProps){
            this.setState(state => ({
                //record: !state.record
                transmitBlob: nextProps.value
            }),() => console.log("UPDATED?", this.state.recordedBlob));
            
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