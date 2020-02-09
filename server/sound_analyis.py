import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from tempfile import TemporaryFile


class Sound_analyis:
    def __init__(self,samples,duration):
        self.amplitudes = samples
        self.duration = duration/1000
        #print(f"Duration of audio {self.duration}")
        #print("Object created...")

    def fft_transform(self):
        freq = len(self.amplitudes)/self.duration # Sampling frequency
        T = self.duration/len(self.amplitudes) # Time between each sample
        print(f"Time between each sample in the object {T}")
        mean_amplitude = np.mean(self.amplitudes)
        self.amplitudes = self.amplitudes - mean_amplitude
        fft = np.fft.fft(self.amplitudes)

        N = len(self.amplitudes)
        f = np.linspace(0,1/T,len(self.amplitudes))
        f = f[:N // 2]
        y = np.abs(fft)[:N // 2]
        y_norm = np.abs(fft)[:N // 2] * 1 / N  # Normalized
        fft_modulus_norm = y_norm


        plt.figure(figsize=(16,5))
        plt.plot(f,y_norm)
        plt.xlabel("Hz")
        plt.ylabel("Normalized magnitued")
        plt.xlim(0,1000)
        plt.xticks(np.arange(0, 1000, 50))


        plt.savefig("FFT plot")
        outfile = TemporaryFile()
        # np.save(outfile, samples)







# T = self.t[1] - self.t[0]




