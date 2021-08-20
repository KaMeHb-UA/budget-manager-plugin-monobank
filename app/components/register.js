import accId from '../helpers/acc-id.js';

export default () => ({
    id: 'monobank-' + accId,
    name: 'monobank',
    hooks: [
        'balance',
        'transactions',
        'currencies_rate',
        'currency_info',
    ],
})
