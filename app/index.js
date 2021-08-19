import { createServer } from 'http';
import { env } from 'process';
import * as methods from './components/methods.js';

const { PORT, API_TOKEN } = env;

if(!API_TOKEN) throw new Error('API_TOKEN isn\'t specified');

const port = +(PORT || 3000);

async function handle({ method: methodName, id, params }){
    const method = methods[methodName];
    if(method){
        try{
            return {
                result: await method(params),
                id,
            };
        } catch(e){
            return {
                id,
                error: {
                    code: -32000,
                    message: e.message,
                },
            }
        }
    } else return {
        id,
        error: {
            code: -32601,
            message: 'Method not found',
        },
    };
}

createServer((req, res) => {
    const body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', async () => res.end(JSON.stringify(await handle(JSON.parse(Buffer.concat(body).toString())))));
}).listen(port, () => console.log('Listening on port ' + port));
