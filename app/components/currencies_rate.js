import { currencyRates } from '../helpers/api.js';
import iso4217 from '../helpers/iso4217.js';

export default async () => {
    const rates = await currencyRates();
    const fixedRates = [];
    for(const rate of rates) fixedRates.push({
        currencyA: iso4217(rate.currencyCodeA).Code,
        currencyB: iso4217(rate.currencyCodeB).Code,
        rate: [ rate.rateBuy, rate.rateSell ],
    });
    return fixedRates;
}
