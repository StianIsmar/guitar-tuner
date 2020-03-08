# guitar-tuner
Guitar tuner built with ReactJS front-end and Python Flask API on the backend. The webapp is responsive.

Screenshots of the webapp:
<p align="center">
  <img height='450px' src="https://github.com/StianIsmar/guitar-tuner/blob/master/screenshots/landing1.png" alt="screenshot" />
  <img height='450px' src="https://github.com/StianIsmar/guitar-tuner/blob/master/screenshots/recorded1.png" alt="screenshot" />
  
</p>




**How the app is built:**
  1. [mic-recorder-to-mp3](https://www.google.com/search?q=mic-recorder-to-mp3&rlz=1C5CHFA_enAU883AU883&oq=mic-recorder-to-mp3&aqs=chrome..69i57.196j0j7&sourceid=chrome&ie=UTF-8) is used to record mp3 on the client side.
  2. POST request with audio information is sent to a REST API running with Flask.
  3. The mp3 file is then parsed with [pydub](https://pypi.org/project/pydub/) to a numpy array:
<p align="center">
  <img height='450px' src="https://github.com/StianIsmar/guitar-tuner/blob/master/screenshots/sound_time.png" alt="screenshot" />
</p>
  4. A Fast Fourier Transformation with numpy is performed on the array in order to see which frequencies are __present__ in the audio array.
 <p align="center">
  <img height='450px' src="https://github.com/StianIsmar/guitar-tuner/blob/master/screenshots/fft.png" alt="screenshot" />
</p>
5. The frequency spectrum is then filtered according to the desired string frequencies:
| **String** | **Frequency** |
|------------|---------------|
| A          | 110.0         |
| D          | 146.83        |
| G          | 196.00        |
| B          | 246.94        |
| E4         | 329.63        |


**Python