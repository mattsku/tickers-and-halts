const fetch = require('node-fetch');

const fetchAllHalts = async haltsApiURL => {
    const response = await fetch(haltsApiURL);
    const responseToJSON = await response.json();
    const halts = responseToJSON?.results?.tradeHalts;
    if(halts===undefined) return;
    return halts;
}

const getDateNewYork = date => {
    const dateNewYork = date.toLocaleString('en-US', { timeZone: 'America/New_York', day: '2-digit', month: '2-digit', year: 'numeric' });
    const dateSplit = dateNewYork.split('/');
    const [year, month, day] = [dateSplit[2], dateSplit[0], dateSplit[1]];
    const dateFormated = `${year}-${month}-${day}`;
    return dateFormated;
}

const isHaltedToday = halt => {
    const now = new Date;
    const dateNY = getDateNewYork(now);
    const isHaltToday = halt.formatedHaltDate === dateNY ? true : false;
    return isHaltToday;
}

const isNotResumedYet = halt => {
    const isNotResumed = 
        halt.formatedResumptionDate === null &&
        halt.formatedResumptionTime === null 
        ? true : false;
    return isNotResumed;
}

const filterHalts = (halts, filterFn) => {
    const filtered = halts.filter(filterFn);
    return filtered;
}

exports.fetchAllHalts   = fetchAllHalts;
exports.getDateNewYork  = getDateNewYork;
exports.isHaltedToday   = isHaltedToday;
exports.isNotResumedYet = isNotResumedYet;
exports.filterHalts     = filterHalts;
