import audioread
from flask import Flask, request #import main Flask class and request object
from flask_cors import CORS
import logging

from pydub import AudioSegment
from pydub.playback import play

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


app = Flask(__name__) #create the Flask app

CORS(app)

@app.route('/')
def landing():
	return 'Landing page'

# Get the blob of type "audio/webm;codecs=opus"
@app.route('/audio_record', methods=['POST'])
def save_record():
	
	logger.info("welcome to upload")
	app.logger.debug(request.form['base64data']) 

	#file = request.files['data']
	file = request.form['base64data']
	print(file)
	
	return "Request received and responded"
	  
'''
def read_audio_file(audio_from_post):
	print("Tring to read audio..")
	with audioread.audio_open(audio_from_post) as f:
	    print(f.channels, f.samplerate, f.duration)
	    for buf in f:
	        print(buf)

'''
if __name__ == '__main__':
    app.run(debug=True, port=5000) #run app in debug mode on port 5000