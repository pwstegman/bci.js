## Functions

<dl>
<dt><a href="#computeQ">computeQ(E)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Compute q, which is used in computing the eigenvalues</p>
</dd>
<dt><a href="#dpss">dpss(length, [NW], [K])</a></dt>
<dd><p>Compute the discrete prolate spheroidal (Slepian) sequences</p>
<p>For lengths greater than 128, DPSSs of length 128 are calculated and then
linearly interpolated up to the desired length.</p>
<p>Once the underlying eigenvector method is optimized further, we may be able to increase the
length prior to interpolation.</p>
<p>Reference: D. B. Percival and A. T. Walden, &quot;Calculation of Discrete Prolate Spheroidal Sequences,&quot; in Spectral Analysis for Physical Applications, pp. 378–390, 1993.</p>
</dd>
<dt><a href="#calculateAdaptiveWeights">calculateAdaptiveWeights(spectrum, eigenvalues, variance)</a> ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>Calculate weights at the taper and frequency level for adaptive multitaper</p>
</dd>
<dt><a href="#multitaper">multitaper(signal, sample_rate, options)</a></dt>
<dd><p>Estimate the power spectral density using the multitaper method</p>
</dd>
<dt><a href="#taper">taper(signal, taper)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Apply a taper to a signal</p>
</dd>
<dt><a href="#welch">welch(signal, sample_rate, options)</a> ⇒ <code>object</code></dt>
<dd><p>Welch&#39;s method
Computes overlapping modified periodograms and averages them together</p>
</dd>
</dl>

<a name="computeQ"></a>

## computeQ(E) ⇒ <code>Array.&lt;number&gt;</code>
Compute q, which is used in computing the eigenvalues

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - q for the given eigenvector  

| Param | Type | Description |
| --- | --- | --- |
| E | <code>Array.&lt;number&gt;</code> | Eigenvector |

<a name="dpss"></a>

## dpss(length, [NW], [K])
Compute the discrete prolate spheroidal (Slepian) sequencesFor lengths greater than 128, DPSSs of length 128 are calculated and thenlinearly interpolated up to the desired length.Once the underlying eigenvector method is optimized further, we may be able to increase thelength prior to interpolation.Reference: D. B. Percival and A. T. Walden, "Calculation of Discrete Prolate Spheroidal Sequences," in Spectral Analysis for Physical Applications, pp. 378–390, 1993.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| length | <code>number</code> |  | Length of sequences |
| [NW] | <code>number</code> | <code>4</code> | Time-half-handwidth (Default 4) |
| [K] | <code>number</code> | <code>floor(2*NW-1)</code> | Number of sequences to return (Default 7) |

<a name="calculateAdaptiveWeights"></a>

## calculateAdaptiveWeights(spectrum, eigenvalues, variance) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Calculate weights at the taper and frequency level for adaptive multitaper

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - The weights  

| Param | Type | Description |
| --- | --- | --- |
| spectrum | <code>Array.&lt;number&gt;</code> | Current estimate of the spectrum |
| eigenvalues | <code>Array.&lt;number&gt;</code> | Eigenvalues of tapers |
| variance | <code>number</code> | Variance of signal |

<a name="multitaper"></a>

## multitaper(signal, sample_rate, options)
Estimate the power spectral density using the multitaper method

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| signal | <code>Array.&lt;number&gt;</code> |  | The signal |
| sample_rate | <code>number</code> |  | The sample rate |
| options | <code>object</code> |  |  |
| [options.nw] | <code>number</code> | <code>4</code> | The time-halfbandwidth. Default is 4. |

<a name="taper"></a>

## taper(signal, taper) ⇒ <code>Array.&lt;number&gt;</code>
Apply a taper to a signal

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - The tapered signal  

| Param | Type | Description |
| --- | --- | --- |
| signal | <code>Array.&lt;number&gt;</code> | The signal |
| taper | <code>Array.&lt;number&gt;</code> | The taper |

<a name="welch"></a>

## welch(signal, sample_rate, options) ⇒ <code>object</code>
Welch's methodComputes overlapping modified periodograms and averages them together

**Kind**: global function  
**Returns**: <code>object</code> - PSD object with keys {estimates: PSD estimates in units of X^2/Hz, frequencies: corresponding frequencies in Hz}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| signal | <code>Array.&lt;number&gt;</code> |  | The input signal |
| sample_rate | <code>number</code> |  | The sample rate |
| options | <code>object</code> |  |  |
| [options.segmentLength] | <code>number</code> | <code>256</code> | How long each segment should be in samples |
| [options.overlapLength] | <code>number</code> | <code></code> | Amount of overlap between segments in samples. Defaults to floor(segmentLength / 2). |
| [options.window] | <code>string</code> \| <code>Array.&lt;number&gt;</code> | <code>&quot;&#x27;hann&#x27;&quot;</code> | Window function to apply, either 'hann', 'rectangular', or an array for a custom window. Default is 'hann'. |
| [options.fftSize] | <code>number</code> | <code>Math.pow(2, bci.nextpow2(signal.length))</code> | Size of the fft to be used. Should be a power of 2. |

