#!/usr/bin/env python3
import audioread
from flask import Flask, request  # import main Flask class and request object
from flask_cors import CORS
import logging
import base64  # For decoding base64 string
import contextlib
import magic
import pydub
from pydub import AudioSegment
from pydub.playback import play
import wave
import re
import os
import sys
import numpy as np
import matplotlib

matplotlib.use('Agg')
import matplotlib.pyplot as pl
from tempfile import TemporaryFile
import sound_analyis
import json
import demjson
import os
print(os.getcwd())

sys.path.append('/ffmpeg-4.2.2')
# !/usr/bin/env python


# from ffprobe import FFProbe

from subprocess import call

from werkzeug.utils import secure_filename

from flask import Flask, flash, request, redirect, url_for

UPLOAD_FOLDER = './uploads'

ALLOWED_EXTENSIONS = {'mp3', 'wav', 'png', 'jpg', 'jpeg', 'gif'}

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

app = Flask(__name__)  # create the Flask app
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'super secret key'

CORS(app)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Get the blob of type "audio/webm;codecs=opus"
@app.route('/audio_record', methods=['POST', 'GET'])
def upload_file():
    # print("OKKKK")
    if request.method == 'POST':
        # print("request is a post request")
        # check if the post request has the file part


        # Getting files from request
        res = request.form['stringSelected']
        res = json.loads(res)
        plucked_string = res['stringSelected']

        file = request.files['base64data']

        print(file)
        audio = pydub.AudioSegment.from_mp3(file)
        segment_duration = len(audio)  # important property for FFT analyis
        print("Segment duration", segment_duration)
        samples = audio.get_array_of_samples()
        samples = np.array(samples)
        print(len(samples))
        plt.figure(figsize=(15, 5))
        plt.plot(samples)
        plt.savefig("plot")
        outfile = TemporaryFile()
        np.save(outfile, samples)
        print(samples)

        # np.savetxt('segment_duration.out',[segment_duration])
        # np.savetxt('test.out', samples, delimiter=',')

        # FFT
        analysis = sound_analyis.Sound_analyis(samples, segment_duration, "E2")
        max_index, desired_freq = analysis.fft_transform()

        comment = ''
        if (max_index - desired_freq < 0):
            tighten = True
            comment = f'Tighten string. Desired was {desired_freq}. Your was {max_index}'
        else:
            tighten = False
            comment = "Loosen string"

        # a Python object (dict):
        print(desired_freq)
        print("max index", max_index)
        print(tighten)
        print(comment)
        response_dict = {
            "desired_freq": desired_freq,
            "actual_freq": max_index[0],
            "tighten": tighten,
            "comment": comment
        }
        response = json.dumps(response_dict)
        return response

        '''
        return 
            <!doctype html>
            <title>Upload new File</title>
            <h1>Upload new File</h1>
            <form method=post enctype=multipart/form-data>
              <input type=file name=file>
              <input type=submit value=Upload>
            </form>
            
        '''


def save_record():
    if request.method == 'GET':
        print("Get request first")
        return "get request"
    try:
        file = request.files['base64data'].filename
    except:
        file = request.form['base64data']

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return redirect(url_for('uploaded_file',
                                filename=filename))

    print(type(file))
    print(file)

    return "OK"

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # run app in debug mode on port 5000