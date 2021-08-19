import { env } from 'process';

const { API_TOKEN } = env;

if(!API_TOKEN) throw new Error('API_TOKEN isn\'t specified');

export default API_TOKEN;
