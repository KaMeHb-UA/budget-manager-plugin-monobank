import currencies, { utils } from 'iso4217';

export const { getByCode } = utils;

export default code => currencies[`${code}`.padStart(3, '0')];
