import accId from './acc-id.js';
import request from './request.js';
import token from './token.js';

const endpoint = 'https://api.monobank.ua/';

async function api(method, data, token){
    return JSON.parse(await request(endpoint + method, data, token ? { 'X-Token': token } : {}))
}

/**
 * @return {Promise<{id: string, time: number, description: string, mcc: number, originalMcc: number, amount: number, operationAmount: number, currencyCode: number, commissionRate: number, cashbackAmount: number, balance: number, hold: boolean, receiptId: string}[]>}
 */
export function txs(){
    return api(`personal/statement/${accId}/${(Math.floor(Date.now() / 1000) - 2678400)}`, null, token);
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
export function personalInfo(){
    return api('personal/client-info', null, token);
}
