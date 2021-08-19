import { currencyRates } from '../helpers/api.js';
import Interval from '../helpers/interval.js';
import iso4217 from '../helpers/iso4217.js';

const methodInterval = 301000; // 5m1s

const caller = new Interval(async () => {
    const rates = await currencyRates();
    const fixedRates = [];
    for(const rate of rates) fixedRates.push({
        currencyA: iso4217(rate.currencyCodeA).Code,
        currencyB: iso4217(rate.currencyCodeB).Code,
        rate: [ rate.rateBuy, rate.rateSell ],
    });
    return fixedRates;
}, methodInterval);

export default () => caller.call();
