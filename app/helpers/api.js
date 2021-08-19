import request from './request.js';
import token from './token.js';

const endpoint = 'https://api.monobank.ua/';

async function api(method, data, token){
    return JSON.parse(await request(endpoint + method, data, token ? { 'X-Token': token } : {}))
}

/**
 * @arg {number} acc
 * @arg {number} dateFrom
 * @return {Promise<{id: string, time: number, description: string, mcc: number, originalMcc: number, amount: number, operationAmount: number, currencyCode: number, commissionRate: number, cashbackAmount: number, balance: number, hold: boolean, receiptId: string}[]>}
 */
export function txs(acc, dateFrom){
    return api(`personal/statement/${acc}/${dateFrom}`, null, token);
}

/**
 * @return {Promise<{[x in 'currencyCodeA' | 'currencyCodeB' | 'date' | 'rateBuy' | 'rateSell']: number}[]>}
 */
export function currencyRates(){
    return api('bank/currency');
}
