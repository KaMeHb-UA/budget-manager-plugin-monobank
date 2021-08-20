import { getType } from './account.js';
import request from './request.js';
import token from './token.js';

const endpoint = 'https://api.monobank.ua/';

let resolveAccounts;
const accounts = new Promise(r => resolveAccounts = r);

async function api(method, data, token){
    return JSON.parse(await request(endpoint + method, data, token ? { 'X-Token': token } : {}))
}

/**
 * @return {Promise<{id: string, time: number, description: string, mcc: number, originalMcc: number, amount: number, operationAmount: number, currencyCode: number, commissionRate: number, cashbackAmount: number, balance: number, hold: boolean, receiptId: string, account: {id: string, type: ReturnType<typeof getType>}}[]>}
 */
export async function txs(){
    const res = [];
    const arr = await Promise.all(
        (await accounts).map(
            acc => api(`personal/statement/${acc.id}/${(Math.floor(Date.now() / 1000) - 2678400)}`, null, token).then(txs => [
                acc,
                txs,
            ])
        )
    );
    for(const [account, txs] of arr) for(const tx of txs) res.push(Object.assign(tx, { account }));
    return res;
}

/**
 * @return {Promise<{[x in 'currencyCodeA' | 'currencyCodeB' | 'date' | 'rateBuy' | 'rateSell']: number}[]>}
 */
export function currencyRates(){
    return api('bank/currency');
}

/**
 * @return {Promise<{ id: string, name: string, webHookUrl: string, accounts: { id: string, balance: number, creditLimit: number, type: string, currencyCode: number, cashbackType: string }[] }>}
 */
export async function personalInfo(){
    const info = await api('personal/client-info', null, token);
    resolveAccounts(info.accounts.map(acc => ({ id: acc.id, type: getType(acc) })));
    return info;
}
