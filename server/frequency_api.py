from flask import Flask, request #import main Flask class and request object
from flask_cors import CORS
import logging

from pydub import AudioSegment
from pydub.playback import play

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


app = Flask(__name__) #create the Flask app

CORS(app)

# Get the blob of type "audio/webm;codecs=opus"
@app.route('/audio_record', methods=['POST'])
def save_record():
	
	logger.info("welcome to upload`")
	#file = request.files['file']
	#filename = secure_filename(file.title)

	file = request.form['file']
	try: 
		sound = AudioSegment.from_file(file[0], format="webm")
		play(sound)
		return "Sound played"
	except: 

		print(file) # Gets printed as undefined
		title = request.form['title']
		print(title) # Able to print title 
		return "Request received and responded"
	    # app.logger.debug(request.files['file'].filename) 


if __name__ == '__main__':
    app.run(debug=True, port=5000) #run app in debug mode on port 5000