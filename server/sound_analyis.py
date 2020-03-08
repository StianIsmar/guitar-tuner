import numpy as np
import matplotlib
from scipy.signal import argrelextrema


matplotlib.use('Agg')
import matplotlib.pyplot as plt
from tempfile import TemporaryFile


class Sound_analyis:

    # guitar_string is one of ["E2","A","D","G","B","E4"]
    def __init__(self, samples, duration, guitar_string):
        self.frequencies = {
            "E2": 82.41,
            "A": 110,
            "D": 146.83,
            "G": 196.00,
            "B": 246.94,
            "E4": 329.63
        }
        self.amplitudes = samples
        self.duration = duration / 1000
        self.guitar_string = guitar_string

        self.freq_limit = self.set_freq_limit(guitar_string)

    def set_freq_limit(self,guitar_string):
        return self.frequencies.get(guitar_string)


    def fft_transform(self):
        MAX_GUITAR_FREQUENCY = 350
        freq = len(self.amplitudes) / self.duration  # Sampling frequency
        T = self.duration / len(self.amplitudes)  # Time between each sample
        print(f"Time between each sample in the object {T}")
        mean_amplitude = np.mean(self.amplitudes)
        self.amplitudes = self.amplitudes - mean_amplitude
        fft = np.fft.fft(self.amplitudes)

        N = len(self.amplitudes)
        f = np.linspace(0, 1 / T, len(self.amplitudes))
        f = f[:N // 2]

        y = np.abs(fft)[:N // 2]
        y_norm = np.abs(fft)[:N // 2] * 1 / N  # Normalized
        print("y_norm.max", np.max(y_norm))
        fft_modulus_norm = y_norm

        f, y_norm, max_val, max_index = self.filter_freq(f, y_norm) # Filter out the unexpected range for certain string

        plt.figure(figsize=(16, 5))

        plt.plot(f, y_norm)
        plt.xlabel("Hz")
        plt.ylabel("Normalized magnitued")
        plt.xlim(0, MAX_GUITAR_FREQUENCY)
        plt.ylim(0,max_val*1.1)
        plt.xticks(np.arange(0, MAX_GUITAR_FREQUENCY, 10))
        plt.margins(0)

        plt.savefig("FFT plot") # Plotting the FFT analyis
        outfile = TemporaryFile()
        # np.save(outfile, samples)
        desired_freq = self.frequencies.get(self.guitar_string)
        return max_index, desired_freq # Returns where the max frequency was and the desired frequency

    def filter_freq(self,f,y_norm):
        # Setting the range where the frequencies are kept, the rest are set to 0.
        UPPER_LIMIT = (self.freq_limit + 30)
        LOWER_LIMIT = (self.freq_limit - 30)
        #indexes = np.nonzero((f > UPPER_LIMIT) & (f < LOWER_LIMIT))

        indexes = [(f > (UPPER_LIMIT)) | (f < (LOWER_LIMIT))] # Look for the frequency magnitude peak in only the expected ranges

        for i, index in enumerate(indexes[0]):
            if (index):
                y_norm[i] = 0
            else:
                continue

        # The next two lines might be interesting for the E2 string, because of the 3 peaks..
        local_maximums_indeces = argrelextrema(y_norm, np.greater)
        print("LOCAL MAXIMUMS: ", local_maximums_indeces)

        max_value = np.max(y_norm)
        max_index = np.where(y_norm == max_value) # Getting the index of the max! This should be the FIRST max!

        freq = f[max_index]

        print(f"max_value: {max_value} and corresponding frequency: {freq}")

        return f, y_norm, max_value, freq

if __name__ == '__main__':

    vib = np.loadtxt('test.out',delimiter=',')
    print(np.max(vib))
    analysis = Sound_analyis(vib, 1.724000000000000000e+03, "E2")
    analysis.fft_transform()