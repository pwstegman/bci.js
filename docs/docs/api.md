<a name="module_bcijs"></a>

## bcijs

* [bcijs](#module_bcijs)
    * _static_
        * [.features](#module_bcijs.features) : <code>object</code>
            * [.logvar(window, [dimension])](#module_bcijs.features.logvar)
            * [.variance(window, [dimension])](#module_bcijs.features.variance)
            * [.rootMeanSquare(window, [dimension])](#module_bcijs.features.rootMeanSquare)
        * [.bandpower(samples, sample_rate, bands, options)](#module_bcijs.bandpower) ⇒ <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.cspLearn(class1, class2)](#module_bcijs.cspLearn) ⇒ <code>Object</code>
        * [.cspProject(cspParams, data, [dimensions])](#module_bcijs.cspProject) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.fastICA(signals, options)](#module_bcijs.fastICA) ⇒ <code>Object</code>
        * [.generateSignal(amplitudes, frequencies, sampleRate, duration)](#module_bcijs.generateSignal) ⇒ <code>Array.&lt;number&gt;</code>
        * [.ldaClassify(ldaParams, point)](#module_bcijs.ldaClassify) ⇒ <code>number</code>
        * [.ldaLearn(class1, class2)](#module_bcijs.ldaLearn) ⇒ <code>Object</code>
        * [.ldaProject(ldaParams, point)](#module_bcijs.ldaProject) ⇒ <code>number</code>
        * [.nextpow2(num)](#module_bcijs.nextpow2) ⇒ <code>number</code>
        * [.periodogram(signal, sample_rate, [options])](#module_bcijs.periodogram) ⇒ <code>Object</code>
        * [.transpose(array)](#module_bcijs.transpose) ⇒ <code>Array</code>
        * [.loadCSV(filePath)](#module_bcijs.loadCSV) ⇒ <code>Promise</code>
        * [.loadEDF(filename)](#module_bcijs.loadEDF) ⇒ <code>Object</code>
        * [.partition(array, ...divisions)](#module_bcijs.partition) ⇒ <code>Array.&lt;Array&gt;</code>
        * [.round(array, places)](#module_bcijs.round) ⇒ <code>Array.&lt;number&gt;</code>
        * [.saveCSV(array, filename)](#module_bcijs.saveCSV) ⇒ <code>Promise</code>
        * [.subscript(array, ...params)](#module_bcijs.subscript) ⇒ <code>Array</code>
        * [.toFixed(array, places)](#module_bcijs.toFixed) ⇒ <code>Array.&lt;string&gt;</code>
        * [.toTable(array)](#module_bcijs.toTable) ⇒ <code>string</code>
        * [.windowApply(array, func, length, step, tail)](#module_bcijs.windowApply) ⇒ <code>Array</code>
        * [.oscCollect(address, port, header, samples)](#module_bcijs.oscCollect) ⇒ <code>Promise</code>
        * [.oscHeaderScan(address, port, duration)](#module_bcijs.oscHeaderScan) ⇒ <code>Promise</code>
        * [.prompt(question)](#module_bcijs.prompt) ⇒ <code>Promise</code>
        * [.wait(ms)](#module_bcijs.wait) ⇒ <code>Promise</code>
        * [.accuracy(confusionMatrix)](#module_bcijs.accuracy) ⇒ <code>number</code>
        * [.balancedAccuracy(confusionMatrix)](#module_bcijs.balancedAccuracy) ⇒ <code>number</code>
        * [.confusionMatrix(predictedClasses, actualClasses)](#module_bcijs.confusionMatrix) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
        * [.f1(confusionMatrix)](#module_bcijs.f1) ⇒ <code>number</code>
        * [.mcc(confusionMatrix)](#module_bcijs.mcc) ⇒ <code>number</code>
        * [.precision(confusionMatrix)](#module_bcijs.precision) ⇒ <code>number</code>
        * [.recall(confusionMatrix)](#module_bcijs.recall) ⇒ <code>number</code>
        * [.specificity(confusionMatrix)](#module_bcijs.specificity) ⇒ <code>number</code>
    * _inner_
        * [~oscStream](#module_bcijs.oscStream)
            * [new oscStream(address, port)](#new_module_bcijs.oscStream_new)
            * [.start()](#module_bcijs.oscStream+start)
            * [.stop()](#module_bcijs.oscStream+stop)
            * [.on(header, callback)](#module_bcijs.oscStream+on)

<a name="module_bcijs.features"></a>

### bcijs.features : <code>object</code>
Feature extraction methods

**Kind**: static namespace of [<code>bcijs</code>](#module_bcijs)  

* [.features](#module_bcijs.features) : <code>object</code>
    * [.logvar(window, [dimension])](#module_bcijs.features.logvar)
    * [.variance(window, [dimension])](#module_bcijs.features.variance)
    * [.rootMeanSquare(window, [dimension])](#module_bcijs.features.rootMeanSquare)

<a name="module_bcijs.features.logvar"></a>

#### features.logvar(window, [dimension])
Computes the log of the variance along the specified dimension

**Kind**: static method of [<code>features</code>](#module_bcijs.features)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| window | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | The data |
| [dimension] | <code>string</code> | <code>null</code> | If 'rows' or 'columns' passed, the features are calculated along that dimension |

<a name="module_bcijs.features.variance"></a>

#### features.variance(window, [dimension])
Computes the variance along the specified dimension

**Kind**: static method of [<code>features</code>](#module_bcijs.features)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| window | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | The data |
| [dimension] | <code>string</code> | <code>null</code> | If 'rows' or 'columns' passed, the features are calculated along that dimension |

<a name="module_bcijs.features.rootMeanSquare"></a>

#### features.rootMeanSquare(window, [dimension])
Computes the root mean square along the specified dimension

**Kind**: static method of [<code>features</code>](#module_bcijs.features)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| window | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | The data |
| [dimension] | <code>string</code> | <code>null</code> | If 'rows' or 'columns' passed, the features are calculated along that dimension |

<a name="module_bcijs.bandpower"></a>

### bcijs.bandpower(samples, sample_rate, bands, options) ⇒ <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Calculate the bandpower of a signal or multiple signals in the specified frequency bands.Uses a modified periodogram with a Hann window by default. (see: bci.periodogram())Bandpower is calculated as the area under the PSD curve estimated using the rectangular method.Units of bandpower are the square of the input signal's units. If the input signal has units of μV,then the bandpower estimate has units μV^2.Returns absolute power by default. Relative band power (absolute power divided by total power in the signal)can be calculated by passing the option {relative: true}. You can also pass custom PSD estimates instead of directly passing the signal. This may be useful if you wishto use your own PSD estimation method of choice, such as Welch's method. In this case, pass a single PSD arrayor pass multiple PSDs in the same form as multiple signals (columns are channels). Then be sure to pass the option {input: 'psd'}.Example usages are provided below.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> \| <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - Bandpower | array of bandpowers if an array of bands is passed as input for a single signal or multiple signals are passed with a single band | array of array of powers for each band if multiple signals are passed  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| samples | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | An array of samples, ex: [1,2,3,4, ...], or, in the case of multiple channels, ex (2 channels): [[1,2], [3,4], [5,6], ...] |
| sample_rate | <code>number</code> |  | Sample rate |
| bands | <code>string</code> \| <code>Array</code> |  | The frequency band provided as an array [frequencyStart, frequencyStop] or a string 'delta' (1-3 Hz), 'theta' (4-7 Hz), 'alpha' (8-12 Hz), 'beta' (13-30 Hz), or 'gamma' (31-50 Hz). |
| options | <code>object</code> |  |  |
| [options.fftSize] | <code>number</code> | <code>Math.pow(2, bci.nextpow2(signal.length))</code> | Size of the fft to be used. Should be a power of 2. |
| [options.average] | <code>boolean</code> | <code>false</code> | Average powers across channels. Default is false. |
| [options.input] | <code>boolean</code> | <code>&#x27;samples&#x27;</code> | Input type. Can be either 'samples' (default) or 'psd'. If you already have a PSD calculated, you can pass the estimates as an array with the input type 'psd'. You can also pass the entire PSD object if it was calculated using the bci.periodogram method, and the input type of 'psd' will be inferred. |
| [options.relative] | <code>boolean</code> | <code>false</code> | Calculate relative bandpower instead of absolute bandpower. Default is false. |
| [options.window] | <code>number</code> | <code>&#x27;hann&#x27;</code> | Window function to apply, either 'hann' or 'rectangular'. Default is 'hann'. |

**Example**  
```js
// Single signal examplelet samples = [0.23, 0.14, 0.78, ...];let sample_rate = 256; // Hzbandpower(samples, sample_rate, 'alpha'); // returns power, ex: 1.652bandpower(samples, sample_rate, ['alpha', 'beta']); // returns an array with the powers in the alpha and beta bands. Ex: [1.473, 0.383]// 2 channel examplesamples = [[0.1, 0.3], [0.4, 0.2], [0.6, 0.5], ...]bandpower(samples, sample_rate, 'alpha'); // returns an array of alpha powers for each channel, ex: [1.342, 0.342]bandpower(samples, sample_rate, ['alpha', 'beta']);// returns an array of arrays of powers in each band, ex: [[1.342, 0.342], [0.245, 1.343]].// The first array is an array of alpha powers for channels 1 and 2// The second array is an array of beta powers for channels 1 and 2bandpower(samples, sample_rate, ['alpha', 'beta'], {average: true});// Calculate average alpha across all channels and average beta across all channels// Returns a value such as [0.842, 0.794]// Note these are the average of [1.342, 0.342] and the average of [0.245, 1.343] from the previous example
```
<a name="module_bcijs.cspLearn"></a>

### bcijs.cspLearn(class1, class2) ⇒ <code>Object</code>
Learn common spatial pattern (CSP) for two datasets.Check out [https://bci.js.org/examples/csp/](https://bci.js.org/examples/csp/) for an interactive example of how CSP works.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Object</code> - Learned CSP parameters  

| Param | Type | Description |
| --- | --- | --- |
| class1 | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | Data samples for class 1. Rows should be samples, columns should be signals. |
| class2 | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | Data samples for class 2. Rows should be samples, columns should be signals. |

**Example**  
```js
let cspParams = bci.cspLearn(class_a, class_b);
```
<a name="module_bcijs.cspProject"></a>

### bcijs.cspProject(cspParams, data, [dimensions]) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Projects data using common spatial pattern (CSP) and reduces to given number of dimensions.Check out [https://bci.js.org/examples/csp/](https://bci.js.org/examples/csp/) for an interactive example of how CSP works.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - Projected data. Rows are samples, columns are dimensions sorted by descending importance.  

| Param | Type | Description |
| --- | --- | --- |
| cspParams | <code>object</code> | CSP parameters computed using the cspLearn function |
| data | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | Data points to be projected. Rows should be samples, columns should be signals. |
| [dimensions] | <code>number</code> | Number of dimensions to be returned. Can range from 1 to number of signals. Defaults to number of signals. |

**Example**  
```js
// Learn the CSP paramslet cspParams = bci.cspLearn(class_a, class_b);// Project the signalslet class_a_csp = bci.cspProject(cspParams, class_a);let class_b_csp = bci.cspProject(cspParams, class_b);
```
<a name="module_bcijs.fastICA"></a>

### bcijs.fastICA(signals, options) ⇒ <code>Object</code>
FastICA algorithm for independent component analysis

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Object</code> - An object with the following values: {source: the estimated source matrix, weights: the estimated unmixing matrix, whitening: the computed whitening matrix, iterations: number of iterations taken to converge on each weight}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| signals | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> |  | The mixed signals. Each row should be a signal and each column a sample. |
| options | <code>Object</code> |  |  |
| [options.maxIterations] | <code>number</code> | <code>1000</code> | Maximum number of iterations |
| [options.debug] | <code>boolean</code> | <code>false</code> | If true, prints out debug information while running |
| [options.fun] | <code>string</code> | <code>&quot;logcosh&quot;</code> | The functional form of the G function used in the approximation of negentropy. Can be either 'exp' or 'logcosh. |

<a name="module_bcijs.generateSignal"></a>

### bcijs.generateSignal(amplitudes, frequencies, sampleRate, duration) ⇒ <code>Array.&lt;number&gt;</code>
Generate a signal with the given frequencies and their amplitudes.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array.&lt;number&gt;</code> - The generated signal.  

| Param | Type | Description |
| --- | --- | --- |
| amplitudes | <code>Array.&lt;number&gt;</code> | The amplitudes of each frequency. |
| frequencies | <code>Array.&lt;number&gt;</code> | The frequencies. |
| sampleRate | <code>number</code> | Sample rate of the signal in Hz. |
| duration | <code>number</code> | Duration of the signal in seconds. |

**Example**  
```js
let amplitudes = [4, 8];let frequencies = [10, 20]; // 10 Hz (alpha), 20 Hz (beta)let sampleRate = 512; // Hzlet duration = 1; // Secondslet signal = bci.generateSignal(amplitudes, frequencies, sampleRate, duration);
```
<a name="module_bcijs.ldaClassify"></a>

### bcijs.ldaClassify(ldaParams, point) ⇒ <code>number</code>
Classify an unknown data point.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - 0 if the first class, 1 if the second class  

| Param | Type | Description |
| --- | --- | --- |
| ldaParams | <code>object</code> | The parameters for the LDA, computed with the function ldaLearn |
| point | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | The data point or array of points to be classified. |

**Example**  
```js
let features = [[1,3], [5,2]]; // Example feature vectorslet classification = bci.ldaClassify(ldaParams, features[0]); // Outputs a number (0 or 1 depending on class)let classifications = bci.ldaClassify(ldaParams, features); // Outputs an array of classifications
```
<a name="module_bcijs.ldaLearn"></a>

### bcijs.ldaLearn(class1, class2) ⇒ <code>Object</code>
Perform linear discriminant analysis between two datasets

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Object</code> - Computed LDA parameters  

| Param | Type | Description |
| --- | --- | --- |
| class1 | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | Data set for class 1, rows are samples, columns are variables |
| class2 | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | Data set for class 2, rows are samples, columns are variables |

**Example**  
```js
// Training setlet class1 = [[0, 0], [1, 2], [2, 2], [1.5, 0.5]];let class2 = [[8, 8], [9, 10], [7, 8], [9, 9]];// Learn an LDA classifierlet ldaParams = bci.ldaLearn(class1, class2);
```
<a name="module_bcijs.ldaProject"></a>

### bcijs.ldaProject(ldaParams, point) ⇒ <code>number</code>
Predict the class of an unknown data point.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - value less than 0 if predicted to be in class 1, 0 if exactly inbetween, greater than 0 if class 2  

| Param | Type | Description |
| --- | --- | --- |
| ldaParams | <code>object</code> | The parameters for the LDA, computed with the function ldaLearn |
| point | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | The data point or array of points to be projected. |

<a name="module_bcijs.nextpow2"></a>

### bcijs.nextpow2(num) ⇒ <code>number</code>
Returns the ceil of the log2 of the absolute value of the passed number

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - The ceil of the log2 of the absolute value of the passed number  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 

**Example**  
```js
nextpow2(8); // 3nextpow2(9); // 4nextpow2(16); // 4nextpow2(30); // 5nextpow2(0); // -Infinity
```
<a name="module_bcijs.periodogram"></a>

### bcijs.periodogram(signal, sample_rate, [options]) ⇒ <code>Object</code>
Estimates the power spectral density of a real-valued input signal using the periodogram method and a rectangular window.Output units are based on that of the input signal, of the form X^2/Hz, where X is the units of the input signal.For example, if the input is an EEG signal measured in μV, then this method returns values of μV^2/Hz.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Object</code> - Object with keys 'estimates' (the psd estimates) and 'frequencies' (the corresponding frequencies)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| signal | <code>Array.&lt;number&gt;</code> |  | The signal. |
| sample_rate | <code>number</code> |  | sample rate in Hz |
| [options] | <code>Object</code> |  |  |
| [options.fftSize] | <code>number</code> | <code>Math.pow(2, bci.nextpow2(signal.length))</code> | Size of the fft to be used. Should be a power of 2. |
| [options.window] | <code>number</code> | <code>&#x27;rectangular&#x27;</code> | Window function to apply, either 'hann' or 'rectangular'. Default is 'rectangular'. |

<a name="module_bcijs.transpose"></a>

### bcijs.transpose(array) ⇒ <code>Array</code>
Transpose an array

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array</code> - The transposed array  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to transpose |

<a name="module_bcijs.loadCSV"></a>

### bcijs.loadCSV(filePath) ⇒ <code>Promise</code>
Loads a CSV file into an array<p>This method is exclusive to Node.js</p>

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Promise</code> - A promise object which resolves to the CSV data array  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The path to the CSV file |

<a name="module_bcijs.loadEDF"></a>

### bcijs.loadEDF(filename) ⇒ <code>Object</code>
Load data from an EDF file<p>This method is exclusive to Node.js</p>

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Object</code> - An object with the following parameters:<br><br> subject [string] - The name of the subject<br> recording [string] - The name of the recording<br> start_time [string] - The start time as a date time string<br> channels [Array] - An array of channel objects<br><br> A channel object has the following parameters:<br><br> label [string] - The label for the channel<br> sample_rate [number] - The sample rate for the channel<br> physical_dimension [string] - The units for each channel (ex: uV)<br> samples [number[]] - An array of samples from the channel  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | Path to the EDF file |

<a name="module_bcijs.partition"></a>

### bcijs.partition(array, ...divisions) ⇒ <code>Array.&lt;Array&gt;</code>
Partitions an array into multiple arraysCan be used to split data into training and testing sets

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array.&lt;Array&gt;</code> - Array of subarrays which are the partitons  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to be partitioned |
| ...divisions | <code>Array.&lt;number&gt;</code> | The size of each partition, each value should range from 0 to 1 |

**Example**  
```js
partition([1, 2, 3, 4], 0.25, 0.75); // returns [[1], [2, 3, 4]]
```
<a name="module_bcijs.round"></a>

### bcijs.round(array, places) ⇒ <code>Array.&lt;number&gt;</code>
Rounds every value in an array to a set number of decimal places

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array.&lt;number&gt;</code> - The rounded array  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;number&gt;</code> | 
| places | <code>number</code> | 

<a name="module_bcijs.saveCSV"></a>

### bcijs.saveCSV(array, filename) ⇒ <code>Promise</code>
Saves an array to a CSV file<p>This method is exclusive to Node.js</p>

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Promise</code> - A promise object that resolves when the file has been saved. Does not currently reject on write error.  

| Param | Type |
| --- | --- |
| array | <code>Array</code> | 
| filename | <code>string</code> | 

<a name="module_bcijs.subscript"></a>

### bcijs.subscript(array, ...params) ⇒ <code>Array</code>
Subscript an array with MATLAB-like syntax

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array</code> - The subscripted array  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to be subscripted |
| ...params | <code>string</code> | Colon notation for which elements to include in each dimension |

**Example**  
```js
var bci = require('bcijs');var arr = [3, 2, 4, 1, 5];var subarr = bci.subscript(arr, '1:3');console.log(subarr); // [3, 2, 4]
```
**Example**  
```js
var bci = require('bcijs');var arr = [  [1, 2, 3],  [4, 5, 6],  [7, 8, 9]];var subarr = bci.subscript(arr, '1 3', '2:3'); // rows 1 and 3, columns 2 through 3console.log(subarr); // [[2, 3], [8, 9]]
```
<a name="module_bcijs.toFixed"></a>

### bcijs.toFixed(array, places) ⇒ <code>Array.&lt;string&gt;</code>
Returns an array of numbers as strings rounded to the proper number of decimal places and padded with zeros as needed.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of string representations of numbers  

| Param | Type |
| --- | --- |
| array | <code>Array</code> | 
| places | <code>number</code> | 

<a name="module_bcijs.toTable"></a>

### bcijs.toTable(array) ⇒ <code>string</code>
Returns an ASCII table representation of an array

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>string</code> - ASCII table  

| Param | Type |
| --- | --- |
| array | <code>Array</code> | 

<a name="module_bcijs.windowApply"></a>

### bcijs.windowApply(array, func, length, step, tail) ⇒ <code>Array</code>
Similar to JavaScript's map, but it applies a function to sub arrays instead of each element.Each sub array, or window, starts at index 0 and has length 'length'Each next window will be shifted 'step' elements from the first. The result of each function is stored in a returned array.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array</code> - An array containing the function result for each window  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| array | <code>Array</code> |  | The array of elements which will be windowed |
| func | <code>function</code> |  | The function to call on each window, the returned result is stored in a returned array |
| length | <code>number</code> |  | The number of elements to include in each window |
| step | <code>number</code> |  | The start of the window is incremented by this amount every iteration |
| tail | <code>boolean</code> | <code>false</code> | If false, windows which begin near the end of the array which cannot reach length 'length' will be ignored |

**Example**  
```js
var bci = require('bcijs');bci.windowApply([1, 2, 3, 4, 5], window => console.log(window), 3, 1);// [1, 2, 3]// [2, 3, 4]// [3, 4, 5] 
```
**Example**  
```js
var bci = require('bcijs');var sums = bci.windowApply([1, 2, 3, 4, 5], window => {  var sum = 0;  window.forEach(x => sum += x);  return sum;}, 3, 1);console.log(sums);// [6, 9, 12]
```
<a name="module_bcijs.oscCollect"></a>

### bcijs.oscCollect(address, port, header, samples) ⇒ <code>Promise</code>
Collect a set number of samples over OSC<p>This method is exclusive to Node.js</p>

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Promise</code> - Resolves with collected data  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | OSC address |
| port | <code>number</code> | OSC port |
| header | <code>string</code> | OSC header, can be found by scanning with oscHeaderScan if unknown |
| samples | <code>number</code> | The number of samples to collect |

<a name="module_bcijs.oscHeaderScan"></a>

### bcijs.oscHeaderScan(address, port, duration) ⇒ <code>Promise</code>
Scan for OSC headers on a port and address<p>This method is exclusive to Node.js</p>

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Promise</code> - Resolves with an array of found headers  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>any</code> | OSC address |
| port | <code>any</code> | OSC port |
| duration | <code>any</code> | Duration of scan in milliseconds |

<a name="module_bcijs.prompt"></a>

### bcijs.prompt(question) ⇒ <code>Promise</code>
Prompts the user for input via stdin<p>This method is exclusive to Node.js</p>

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Promise</code> - A promise object that resolves with the response  

| Param | Type | Description |
| --- | --- | --- |
| question | <code>string</code> | Question shown to user |

<a name="module_bcijs.wait"></a>

### bcijs.wait(ms) ⇒ <code>Promise</code>
**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Promise</code> - A promise which resolves when the timeout occurs  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Number of milliseconds to wait |

<a name="module_bcijs.accuracy"></a>

### bcijs.accuracy(confusionMatrix) ⇒ <code>number</code>
Calculate the accuracy of a classifier given its confusion matrix as defined by the confusionMatrix method

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - The accuracy  

| Param | Type | Description |
| --- | --- | --- |
| confusionMatrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a confusion matrix |

<a name="module_bcijs.balancedAccuracy"></a>

### bcijs.balancedAccuracy(confusionMatrix) ⇒ <code>number</code>
Calculate the balanced accuracy of a classifier given its confusion matrix as defined by the confusionMatrix method

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - The balanced accuracy  

| Param | Type | Description |
| --- | --- | --- |
| confusionMatrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a confusion matrix |

<a name="module_bcijs.confusionMatrix"></a>

### bcijs.confusionMatrix(predictedClasses, actualClasses) ⇒ <code>Array.&lt;Array.&lt;number&gt;&gt;</code>
Generate a confusion matrix C where rows are actual classes and columns are predicted classes.C = [  [true negative, false positive],  [false negative, true positive]].If two classes are passed, class 0 represents the negative case, and class 1 represents the positive case.If more than two classes are passed, an NxN confusion matrix is returned where N is the number of classes.

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>Array.&lt;Array.&lt;number&gt;&gt;</code> - The confusion matrix  

| Param | Type | Description |
| --- | --- | --- |
| predictedClasses | <code>Array.&lt;number&gt;</code> | An array of predicted classes, with class numbers starting at 0 |
| actualClasses | <code>Array.&lt;number&gt;</code> | An array of the actual classes, with class numbers starting at 0 |

<a name="module_bcijs.f1"></a>

### bcijs.f1(confusionMatrix) ⇒ <code>number</code>
Calculate the f1 score of a binary classifier given its confusion matrix as defined by the confusionMatrix method

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - The f1 score  

| Param | Type | Description |
| --- | --- | --- |
| confusionMatrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a 2x2 confusion matrix |

<a name="module_bcijs.mcc"></a>

### bcijs.mcc(confusionMatrix) ⇒ <code>number</code>
Calculate the Matthews correlation coefficient (MCC) of a binary classifier given its confusion matrix as defined by the confusionMatrix method

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - The Matthews correlation coefficient  

| Param | Type | Description |
| --- | --- | --- |
| confusionMatrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a 2x2 confusion matrix |

<a name="module_bcijs.precision"></a>

### bcijs.precision(confusionMatrix) ⇒ <code>number</code>
Calculate the precision of a binary classifier given its confusion matrix as defined by the confusionMatrix method

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - The precision (positive predictive value)  

| Param | Type | Description |
| --- | --- | --- |
| confusionMatrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a 2x2 confusion matrix |

<a name="module_bcijs.recall"></a>

### bcijs.recall(confusionMatrix) ⇒ <code>number</code>
Calculate the recall of a binary classifier given its confusion matrix as defined by the confusionMatrix method

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - The recall (true positive rate)  

| Param | Type | Description |
| --- | --- | --- |
| confusionMatrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a 2x2 confusion matrix |

<a name="module_bcijs.specificity"></a>

### bcijs.specificity(confusionMatrix) ⇒ <code>number</code>
Calculate the specificity of a binary classifier given its confusion matrix as defined by the confusionMatrix method

**Kind**: static method of [<code>bcijs</code>](#module_bcijs)  
**Returns**: <code>number</code> - The specificity (true negative rate)  

| Param | Type | Description |
| --- | --- | --- |
| confusionMatrix | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | a 2x2 confusion matrix |

<a name="module_bcijs.oscStream"></a>

### bcijs~oscStream
Listen for messages over OSC<p>This method is exclusive to Node.js</p>

**Kind**: inner class of [<code>bcijs</code>](#module_bcijs)  

* [~oscStream](#module_bcijs.oscStream)
    * [new oscStream(address, port)](#new_module_bcijs.oscStream_new)
    * [.start()](#module_bcijs.oscStream+start)
    * [.stop()](#module_bcijs.oscStream+stop)
    * [.on(header, callback)](#module_bcijs.oscStream+on)

<a name="new_module_bcijs.oscStream_new"></a>

#### new oscStream(address, port)

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address to listen on |
| port | <code>number</code> | Port to listen on |

<a name="module_bcijs.oscStream+start"></a>

#### oscStream.start()
Start listening for OSC messages

**Kind**: instance method of [<code>oscStream</code>](#module_bcijs.oscStream)  
<a name="module_bcijs.oscStream+stop"></a>

#### oscStream.stop()
Stop listening for OSC messages

**Kind**: instance method of [<code>oscStream</code>](#module_bcijs.oscStream)  
<a name="module_bcijs.oscStream+on"></a>

#### oscStream.on(header, callback)
Call a callback function when data containing a specified OSC header is seen

**Kind**: instance method of [<code>oscStream</code>](#module_bcijs.oscStream)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | The OSC header |
| callback | <code>requestCallback</code> | Called with the OSC data passed as the parameter |

