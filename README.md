# tickers-and-halts

Fetch all current trading halts and all listed stock tickers (NYSE, NASDAQ, AMEX).


## Usage
```
npm i tickers-halts
```


### Fetch all current trading halts:
```javascript
const {getHaltedAll} = require('tickers-halts');
const halts = getHaltedAll().then(response => console.log(response));
```


### Fetch only tickers halted today (currently halted and already resumed tickers):
```javascript
const {getHaltedToday} = require('tickers-halts');
const halts = getHaltedToday().then(response => console.log(response));
```


### Fetch only tickers halted today and not resumed yet:
```javascript
const {getHaltedNow} = require('tickers-halts');
const halts = getHaltedNow().then(response => console.log(response));
```


### Fetch an array of objects containing all listed tickers:
```javascript
const {getTickers} = require('tickers-halts');
const tickers       = getTickers().then(response => /*process response*/);
const tickersAmex   = getTickers('AMEX').then(response => /*process response*/);
const tickersNyse   = getTickers('NYSE').then(response => /*process response*/);
const tickersNasdaq = getTickers('NASDAQ').then(response => /*process response*/);
```

### Fetch all listed tickers and save it to txt file:
```javascript
const {saveTickersToTxt} = require('tickers-halts');
const tickers = saveTickersToTxt();
```

### Fetch all listed tickers and save it to csv file:
```javascript
const {saveTickersToCsv} = require('tickers-halts');
const tickers = saveTickersToCsv();
```