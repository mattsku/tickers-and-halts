const fetch = require('node-fetch');
const fs = require('fs');

const fetchTickers = async (tickersApiURL, exchange='') => {
    if(exchange==='NYSE' || exchange==='NASDAQ' || exchange==='AMEX'){
        tickersApiURL += `&exchange=${exchange}`;
    }
    const response = await fetch(tickersApiURL, { method: 'GET', headers: {
            Accept: 'application/json, text/plain, */*',
            'User-Agent': 'tickers-halts/1.0.0'
        }
    });
    const responseToJSON = await response.json();
    const tickers = responseToJSON?.data?.table?.rows;
    if(tickers===undefined) return;
    return tickers;
}

const isNotSpecialSeries = ticker => {
    const isNotSpecial = ticker.symbol.includes('^') || ticker.symbol.includes('/') ? false : true;
    return isNotSpecial;
}

const filterTickers = (tickers, filterFn) => {
    const filtered = tickers.filter(filterFn);
    return filtered;
}

const saveToTxt = (tickers, path='./tickers.txt') => {
    let txt = '';
    tickers.forEach(ticker => {
        txt+=`${ticker.symbol}\n`;
    });
    const stream = fs.createWriteStream(path);
    stream.write(txt);
}

const saveToCsv = (tickers, path='./tickers.csv') => {
    let csv = 'symbol,last,netchange,%change,marketCap\n';
    tickers.forEach(ticker => {
        csv+=`${ticker.symbol},${ticker.lastsale.substring(1)},${ticker.netchange},${ticker.pctchange},${ticker.marketCap.replace(/,/g, '.')}\n`;
    });
    const stream = fs.createWriteStream(path);
    stream.write(csv);
}

exports.fetchTickers       = fetchTickers;
exports.isNotSpecialSeries = isNotSpecialSeries;
exports.filterTickers      = filterTickers;
exports.saveToTxt          = saveToTxt;
exports.saveToCsv          = saveToCsv;
