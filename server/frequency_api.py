#!/usr/bin/env python3
import os
import sys
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
from flask_sslify import SSLify

matplotlib.use('Agg')
import matplotlib.pyplot as plt
from tempfile import TemporaryFile
import sound_analyis
import json
import demjson


from subprocess import call

from werkzeug.utils import secure_filename

from flask import Flask, flash, request, redirect, url_for

UPLOAD_FOLDER = './uploads'

ALLOWED_EXTENSIONS = {'mp3', 'wav', 'png', 'jpg', 'jpeg', 'gif'}

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

app = Flask(__name__)  # create the Flask app
sslify=SSLify(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'super secret key'

CORS(app)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def hello_world():
    return 'Hello, World!'


# Get the blob of type "audio/webm;codecs=opus"
@app.route('/audio_record', methods=['POST', 'GET'])
def upload_file():
    if request.method == 'POST':

        # Getting files from request
        res = request.form['stringSelected']
        res = json.loads(res)
        plucked_string = res['stringSelected']

        file = request.files['base64data'] # The sound file

        audio = pydub.AudioSegment.from_mp3(file) # Parcing the Blob to mp3
        segment_duration = len(audio)  # important property for FFT analyis
        print("Segment duration", segment_duration)
        samples = audio.get_array_of_samples()
        samples = np.array(samples)
        

        # Creating figure for recorded audio with matplotlib
        #plt.figure(figsize=(15, 5))
        #plt.plot(samples)
        #plt.savefig("plot")
        #outfile = TemporaryFile()
        #np.save(outfile, samples)

        # Uncomment for saving vibrations in a .txt file
        # np.savetxt('segment_duration.out',[segment_duration])
        # np.savetxt('test.out', samples, delimiter=',')

        # FFT
        analysis = sound_analyis.Sound_analyis(samples, segment_duration, plucked_string)
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


if __name__ == '__main__':
    app.run(debug=True, port=5000)  # run app in debug mode on port 5000