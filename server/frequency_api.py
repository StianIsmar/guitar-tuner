from flask import Flask, request #import main Flask class and request object
from flask_cors import CORS


app = Flask(__name__) #create the Flask app

CORS(app)

@app.route('/audio_record', methods=['POST'])
def save_record():
	file = request.form['file']
	title = request.form['title']
	print(file)
	print("TITLE", title)
	return "Request received and responend"
    # app.logger.debug(request.files['file'].filename) 


if __name__ == '__main__':
    app.run(debug=True, port=5000) #run app in debug mode on port 5000