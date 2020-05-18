# guitar-tuner
Guitar tuner built with ReactJS front-end and Python Flask API on the backend. The webapp is responsive.
# Table of Contents
1. [Screenshots](#screenshots)
2. [Idea behind app](#idea)
3. [Installation](#installation)
4. [How it is built](#built)


## Screenshots Of The App: <a name="screenshots"></a>
<p align="center">
  <img height='450px' src="https://github.com/StianIsmar/guitar-tuner/blob/master/screenshots/landing1.png" alt="screenshot" />
  <img height='450px' src="https://github.com/StianIsmar/guitar-tuner/blob/master/screenshots/recorded1.png" alt="screenshot" />
  
</p>

## Idea Behind The App: <a name="idea"></a>
The idea is that a user can record one guitar string at a time and get visual feedback as to how in tune the string is with regards to the desired "tuning frequencies":

| **String** | **Frequency** |
|------------|---------------|
| **E2**         | 82.41         |
| **A**          | 110.0         |
| **D**          | 146.83        |
| **G**          | 196.00        |
| **B**          | 246.94        |
| **E4**         | 329.63        |

## Running Project locally <a name="installation"></a>
1. Install Python3 and [ffmpeg](https://github.com/jiaaro/pydub#getting-ffmpeg-set-up)
2. Clone repo: ``` git clone git@github.com:StianIsmar/guitar-tuner.git```
3. Create a virtual environment with ```virtualenv -p python3 ./venv```
4. Activate the virtual env with ```source venv/bin/activate```
4. ```server``` and run ```pip install -r server/requirements.txt``` to install python packages
5. Run API with ```python server/frequency_api.py```
6. ```cd client```
7. ```npm i```to install react packages
8. ```npm start```
9. Get out your guitar


## How The App Is Built: <a name="built"></a>
  1. The audio is recorded on the client-side using [mic-recorder-to-mp3](https://www.google.com/search?q=mic-recorder-to-mp3&rlz=1C5CHFA_enAU883AU883&oq=mic-recorder-to-mp3&aqs=chrome..69i57.196j0j7&sourceid=chrome&ie=UTF-8).
  2. POST request with audio information is sent to a REST API running with Flask.
  3. The mp3 file is then parsed with [pydub](https://pypi.org/project/pydub/) to a numpy array:
<p align="center">
  <img height='350px' src="https://github.com/StianIsmar/guitar-tuner/blob/master/screenshots/plot.png" alt="screenshot" />
</p>
  4. A Fast Fourier Transformation with numpy is performed on the array in order to see which frequencies are present in the audio array.
 
<p align="center">
  <img height='350px' src="https://github.com/StianIsmar/guitar-tuner/blob/master/screenshots/FFTplot.png" alt="screenshot" />
</p>

5. The frequency spectrum is then filtered according to the desired string frequencies, and the largest amplitude frequency is returned in the POST response from the Flask API.
