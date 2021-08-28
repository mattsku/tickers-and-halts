const {
    fetchAllHalts,
    isHaltedToday,
    isNotResumedYet,
    filterHalts
} = require('./_halts.js');

const {
    fetchTickers,
    isNotSpecialSeries,
    filterTickers,
    saveToTxt,
    saveToCsv
} = require('./_tickers.js');

const HALTS_URL   = 'https://www.nyse.com/api/trade-halts/current?filterToken=&max=50&offset=0&pageNumber=1&sortOrder=up&sortType=';
const TICKERS_URL = 'https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=0&offset=0';

//Halts
exports.getHaltedAll = async () => {
    const allHalts = await fetchAllHalts(HALTS_URL);
    return allHalts;
}

exports.getHaltedToday = async () => {
    const allHalts = await fetchAllHalts(HALTS_URL);
    const today    = filterHalts(allHalts, isHaltedToday);
    return today;
}

exports.getHaltedNow = async () => {
    const haltsAll   = await fetchAllHalts(HALTS_URL);
    const haltsToday = filterHalts(haltsAll, isHaltedToday);
    const haltsNow   = filterHalts(haltsToday, isNotResumedYet);
    return haltsNow;
}

//Tickers
exports.getTickers = async (exchange='') => {
    const tickersFetchAll = await fetchTickers(TICKERS_URL, exchange);
    const tickersRegular  = filterTickers(tickersFetchAll, isNotSpecialSeries);
    return tickersRegular;
}

exports.saveTickersToTxt = async (exchange='') => {
    const tickersFetchAll = await fetchTickers(TICKERS_URL, exchange);
    const tickersRegular  = filterTickers(tickersFetchAll, isNotSpecialSeries);
    saveToTxt(tickersRegular);
}

exports.saveTickersToCsv = async (exchange='') => {
    const tickersFetchAll = await fetchTickers(TICKERS_URL, exchange);
    const tickersRegular  = filterTickers(tickersFetchAll, isNotSpecialSeries);
    saveToCsv(tickersRegular);
}
