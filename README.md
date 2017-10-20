# WebBCI
JavaScript based EEG signal processing

**Goal:** Build portable/modern framework for web-based BCI applications

**Current methods:**

signalProcessing.js

- getPSD(fftSize, signal)
   - Given a time series signal, return the power in each frequency band computed using an FFT
 - getBandPower(fftSize, psd, sampleRate, band)
   - band can be an array [frequencyStart, frequencyStop] or a string 'delta', 'theta', 'alpha', 'mu', 'smr', 'lowbeta', 'beta', 'highbeta', 'gamma'
   - Computes the average power across the frequency band in the given power spectral density (psd) array
   - Examples: getBandPower(1024, psd, 512, 'alpha')(); getBandPower(1024, psd, 512, [7.5, 12.5]);
 - eegw = new EEGWindow(size, numChannels, callback)
   - add data to an eeg data window using eegw.addData(dataSample). When number of dataSamples = size, callback is called with array of dataSamples and the window is reset
   - can reset / clear data in window early by calling eegw.clear()
 - generateSignal(amplitudes, frequencies, sampleRate, duration)
   - return summation of `amplitude*sin(2*pi*frequency*t)` for the given amplitudes and frequencies over a duration (in seconds) given a sample rate (in Hz)

networking.js

- addEEGListener(oscAddress, oscPort, eegAddress, callback)
   - listens for EEG data at oscAddress:oscPort with OSC Address Pattern eegAddress
   - callback is called with the eeg data each time a sample is received

lda.js

- lda = new LDA(set1, set2)
   - Computes LDA given data from set/class 1 and data from set/class 2
   - lda.predict(sample)
     - predicts which class a new sample belongs to. Returns -1 if set1, 1 if set2, and 0 if exactly in between


**Future method ideas:**
 - Store computed features (such as power in alpha or beta bands)
 - Average results over time
 - Visualize results
   - Bar graph of band powers (alpha, beta, etc.)
   - Time series EEG data display
   - Frequency domain plot
