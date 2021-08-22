import { getType } from '../helpers/account.js';
import { personalInfo } from '../helpers/api.js';
import iso4217 from '../helpers/iso4217.js';
import currencyInfo from './currency_info.js';

export default async () => {
    const info = await personalInfo();
    const balances = [];
    for(const acc of info.accounts){
        const cc = iso4217(acc.currencyCode).Code;
        const ci = currencyInfo(cc);
        balances.push({
            type: getType(acc),
            amount: acc.balance / 10 ** ci.fraction,
            currency: cc,
            id: acc.id,
        });
    }
    return balances;
}
