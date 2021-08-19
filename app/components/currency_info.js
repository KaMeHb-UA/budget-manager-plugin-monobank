import { getByCode } from '../helpers/iso4217.js';

export default code => {
    const info = getByCode(code);
    if(!info) return null;
    return {
        name: info.Currency,
        symbol: info.Symbol,
        fraction: info.Fraction || 2,
    };
}
