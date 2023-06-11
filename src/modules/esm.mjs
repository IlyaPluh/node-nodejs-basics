import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import 'src/modules/files/c.js';

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = import('src/modules/files/files/a.json');
} else {
    unknownObject = import('src/modules/files/files/b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(await unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
