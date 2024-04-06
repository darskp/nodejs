import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';

let port = 8000;
let server = http.createServer((req: any, res: any) => {
    if (req.url === '/favicon.ico') {
        return res.end()
    }
    let myURL=url.parse(req.url,true);   
     let date = new Date();
    let dateNow = date.toLocaleString()
    fs.appendFile('./index.txt', `Time - ${dateNow}, Requested - ${req.url}, Method - ${req.method}  \n`, (Error: any) => {
        switch (myURL.pathname) {
            case '/': res.end(`Hi, ${myURL.query.name}`)
                break;
            case '/about': res.end("hi i am about")
                break;
            default: res.end('404')
        }
    })
})

server.listen(8000, () => {
    console.log("listening to the server");
    console.log(`http://localhost:${port}/`);
})