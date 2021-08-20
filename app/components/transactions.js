import { txs } from '../helpers/api.js';
import Interval from '../helpers/interval.js';
import iso4217 from '../helpers/iso4217.js';
import currencyInfo from './currency_info.js';

const requestInterval = 61000; // 1m1s

const caller = new Interval(async () => {
    const transactions = await txs();
    return transactions.map(tx => {
        const currencyCode = iso4217(tx.currencyCode).Code;
        const divider = 10 ** currencyInfo(currencyCode).fraction;
        return {
            description: tx.description,
            id: tx.id,
            currency: currency.Code,
            amount: tx.amount / divider,
            time: tx.time * 1000,
            comission: tx.commissionRate / divider,
            cashback: tx.cashbackAmount / divider,
            restBalance: tx.balance / divider,
            mcc: tx.mcc,
        };
    });
}, requestInterval);

export default () => caller.call();
