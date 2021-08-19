import { env } from 'process';

const { ACCOUNT } = env;

export default ACCOUNT || '0';
