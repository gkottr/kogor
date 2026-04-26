import express from 'express';
import proxy from 'express-http-proxy';
import { join } from 'node:path';
import {createServer} from 'node:https';
import { readFileSync } from 'node:fs';
import { domainToUnicode } from 'node:url';

import { promisify } from 'node:util';
import { brotliDecompress } from 'node:zlib';
const brotliDecompressPromise = promisify(brotliDecompress);

const port = process.env.PORT ?? 1488;
const app = express();

app.get('/', (req, res) => res.send(`<span style="white-space: pre;">


____________#####____________________________
___________#________##_____####__###_________
__________####_______##__##_____##__#________
_________##___########___##_##_______#_______
________##__________##___##__________#_______
________#___________#_____#__________##______
_______#____________#______#_____######______
______#########____#_______#__##########_____
_____###############_______#############_____
_____###############________############_____
_____##############_________###########______
______###########____________########________
_______#########_____Cheers______#_#__#______
______##____________________________#________
_____##_____________________________##_______
____##________________________________#______
____#_________________________________##_____
</span>`));

app.get('/babyficator', (req, res) => {
    res.sendFile(join(import.meta.dirname, '../', 'babyficator', 'dist', 'index.html'));
});



const excludedPaths = ['/', '/music.mp3', '/babyficator', '/api-middleware'];

app.use('/api-middleware', proxy('https://api.wedding-planner.pro', {
    userResDecorator: async (proxyRes, proxyResData, userReq, userRes) => {
        if (
            userRes.getHeader('content-encoding') !== 'br'
            || !userReq.path.includes('api/individual-invitations')
        ) {
            return proxyResData;
        }

        try {
            const decompressedBuffer = await brotliDecompressPromise(proxyResData);        
            const responseString = decompressedBuffer.toString('utf8');
            const response = JSON.parse(responseString);

            if (response.groomName === 'Никита') {
                response.groomName = 'Бейби';
            }

            const finalResponse = JSON.stringify(response);

            userRes.setHeader('content-encoding', 'utf-8');
            return finalResponse;
        } catch (e) {
            console.error(e);
            return proxyResData;
        }
    },
    proxyReqPathResolver: (req) => {
        return encodeURI(decodeURI(req.url)
            .replaceAll(req.hostname, 'svdba.ru')
            .replaceAll('бейби-и-анастасия.рф', 'svdba.ru')
        );
    },
}));

app.use(proxy('https://svdba.ru', {
    filter: (req) => {
        return !excludedPaths.includes(req.path);
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        if (!(userRes.getHeader('content-type').split(';').includes('application/javascript'))) {
            return proxyResData;
        }

        const responseString = proxyResData.toString('utf8');

        return responseString
            .replaceAll('https://api.wedding-planner.pro', `${userReq.headers.origin}/api-middleware`)
            .replaceAll('"svdba.ru",', `"svdba.ru","${userReq.hostname}","${domainToUnicode(userReq.hostname)}",`);
    },

}));

createServer({
    key: readFileSync('../certs/server.key'),
    cert: readFileSync('../certs/server.cert'),
}, app).listen(port, () => {
    console.log(`Bastard started at ${port} port`);
    console.log(`https://localhost:${port}`);
});
