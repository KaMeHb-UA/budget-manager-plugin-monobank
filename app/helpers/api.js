import { getType } from './account.js';
import Interval from './interval.js';
import request from './request.js';
import token from './token.js';

const endpoint = 'https://api.monobank.ua/';

let accounts;

async function api(method, data, token){
    return JSON.parse(await request(endpoint + method, data, token ? { 'X-Token': token } : {}))
}

// there may be 429 errors while getting txs so it's better to bufferrize last got txs
const lastTxs = {};

/**
 * @type {() => Promise<{id: string, time: number, description: string, mcc: number, originalMcc: number, amount: number, operationAmount: number, currencyCode: number, commissionRate: number, cashbackAmount: number, balance: number, hold: boolean, receiptId: string, account: {id: string, type: ReturnType<typeof getType>}}[]>}
 */
export const txs = new Interval(async () => {
    const res = [];
    if(!accounts) personalInfo();
    const arr = await Promise.all(
        (await accounts).map(
            async acc => {
                try{
                    const res = await api(`personal/statement/${acc.id}/${(Math.floor(Date.now() / 1000) - 2678400)}`, null, token);
                    lastTxs[acc.id] = res;
                    return [
                        acc,
                        res,
                    ];
                } catch(e){
                    console.error(e.message);
                    return [
                        acc,
                        lastTxs[acc.id] || [],
                    ];
                }
            }
        )
    );
    for(const [account, txs] of arr) for(const tx of txs) res.push(Object.assign(tx, { account }));
    return res;
}, 61000/* 1m1s */);

/**
 * @type {() => Promise<{[x in 'currencyCodeA' | 'currencyCodeB' | 'date' | 'rateBuy' | 'rateSell']: number}[]>}
 */
export const currencyRates = new Interval(() => api('bank/currency'), 301000 /* 5m1s */);

/**
 * @type {() => Promise<{ id: string, name: string, webHookUrl: string, accounts: { id: string, balance: number, creditLimit: number, type: string, currencyCode: number, cashbackType: string }[] }>}
 */
export const personalInfo = new Interval(async () => {
    const info = api('personal/client-info', null, token);
    accounts = info.then(v => v.accounts.map(acc => ({ id: acc.id, type: getType(acc) })));
    return info;
}, 61000/* 1m1s */);
