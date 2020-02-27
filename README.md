# ADID 
![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](http://mrzzcn.github.io/ADID)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> generate ADID by canvas fingerprint

### 🏠 [Homepage](https://github.com/mrzzcn/ADID)

### ✨ [Demo](http://mrzzcn.github.io/ADID)

## Install

```sh
yarn add adid
```



## Usage

```javascript
import ADID from 'adid'

ADID().then(res => {
  console.log(res);
})
```



```html
<script src="https://unpkg.com/adid@0.0.1/lib/index.js"></script>
<script>
  window.ADID().then(function(result) {
		console.log(result)
  });
</script>
```

