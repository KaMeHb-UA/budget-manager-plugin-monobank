import { request } from 'https';
import { Buffer } from 'buffer';

/**
 * @arg {string} url
 * @arg {string=} data
 * @arg {{[x: string]: string}=} headers
 * @return {Promise<string>}
 */
export default (url, data, headers) => new Promise((resolve, reject) => {
    const req = request(url, { method: data ? 'POST' : 'GET', headers: headers || {} }, res => {
        if(res.statusCode < 200 || res.statusCode >= 300){
            return reject(new Error(`request to ${url} returned bad status code ${res.statusCode}`));
        }
        const body = [];
        res.on('data', chunk => body.push(chunk));
        res.on('end', () => resolve(Buffer.concat(body).toString()));
    });
    req.on('error', err => reject(err));
    if(data) req.write(data);
    req.end();
});
