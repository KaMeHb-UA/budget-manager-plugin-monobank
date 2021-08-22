import { getByCode } from '../helpers/iso4217.js';

export default ({ code }) => {
    const info = getByCode(code);
    if(!info) throw new Error(`couldn't find currency with code ${code}`);
    return {
        name: info.Currency,
        symbol: info.Symbol,
        fraction: info.Fraction || 2,
    };
}
