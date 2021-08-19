import accId from '../helpers/acc-id.js';
import { personalInfo } from '../helpers/api.js';
import Interval from '../helpers/interval.js';
import iso4217 from '../helpers/iso4217.js';
import currencyInfo from './currency_info.js';

const requestInterval = 300000; // 5m

const caller = new Interval(async () => {
    const info = await personalInfo();
    const filtered = info.accounts.filter(({ id }) => id === accId);
    const acc = (filtered.length ? filtered : info.accounts)[0];
    const cc = iso4217(acc.currencyCode).Code;
    const ci = currencyInfo(cc);
    return {
        currency: cc,
        balance: acc.balance / 10 ** ci.fraction,
    };
}, requestInterval);

export default () => caller.call();
