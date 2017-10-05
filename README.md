# WebBCI
JavaScript based EEG signal processing

**Goal:** Build portable/modern framework for web-based BCI applications

**Current methods:**
 - None

**Current methods (testing):**
 - get\[bandName\](fftFreqBins, fftSize, sampleRate)
   - \[bandName\] can be 'Delta', 'Theta', 'Alpha', 'Mu', 'SMR', 'LowBeta', 'Beta', 'HighBeta', 'Gamma'
   - Computes the average power across the frequency band given the frequency bins computed using FFT
   - Examples: getAlpha(); getBeta();
   - Note: possibly cleaner implementation could be getBandPower(bandName, fftFreqBins, fftSize, sampleRate) instead of having separate functions for each band

**Future method ideas:**
 - Return raw EEG
 - Store computed features (such as power in alpha or beta bands)
 - Basic classifiers (such as LDA) calibrated using stored features for use in machine learning
 - Average results over time
 - Visualize results
   - Bar graph of band powers (alpha, beta, etc.)
   - Time series EEG data display
   - Frequency domain plot
