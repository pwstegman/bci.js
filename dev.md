## Building bci.js

BCI.js methods are contained within the [src](src) directory. To keep the project organized, methods are separated into five folders:
 - `compat` Deprecated methods which remain for compatibility purposes
 - `data` Methods which pertain to data management (CSV files, partition data, etc.)
 - `math` Methods used to process data (CSP, LDA, ICA, etc.)
 - `metrics` Methods for result metrics (confusion matrices, precision, recall, f1 scores, etc.)
 - `network` Networking methods (OSC)

If a method is Node.js exclusive and won't run in the browser, placing

```html
<p>This method is exclusive to Node.js</p>
```

below the method description in the documentation comment will exclude the method from the browser-only build.

To create a new method, create a file in the appropriate folder, and make sure the file name matches the method name. When bci.js builds, it searches for new files within the [src](src) folders and adds them automatically.

Looking at [src/modules.js](src/modules.js), you'll see each method of bci.js points to the appropriate file in [src](src). As such, making a change to an already existing method will not require rebuilding the index.js. However, adding a new method or renaming a method will require a rebuild.

To rebuild [src/modules.js](src/modules.js), run

```bash
npm run build
```

This will also rebuild [src/modules_browser.js](src/modules_browser.js), which is index.js, but with the node-only methods removed. That way it can be used with webpack or browserify.

To rebuild the dist files for use in the browser, run

```bash
npm run dist
```

To rebuild the [docs](docs), run

```bash
npm run docs
```
