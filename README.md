# WebBCI
JavaScript based EEG signal processing

**Goal:** Build portable/modern framework for web-based BCI applications

**Current methods:**
 - None

**Current methods (testing):**
 - getPSD(fftSize, signal)
   - Given a time series signal, return the power in each frequency band computed using an FFT
 - getBandPower(fftSize, psd, sampleRate, band)
   - band can be an array [frequencyStart, frequencyStop] or a string 'delta', 'theta', 'alpha', 'mu', 'smr', 'lowbeta', 'beta', 'highbeta', 'gamma'
   - Computes the average power across the frequency band in the given power spectral density (psd) array
   - Examples: getBandPower(1024, psd, 512, 'alpha')(); getBandPower(1024, psd, 512, [7.5, 12.5]);

**Future method ideas:**
 - Return raw EEG
 - Store computed features (such as power in alpha or beta bands)
 - Basic classifiers (such as LDA) calibrated using stored features for use in machine learning
 - Average results over time
 - Visualize results
   - Bar graph of band powers (alpha, beta, etc.)
   - Time series EEG data display
   - Frequency domain plot
