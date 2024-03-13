import * as fs from 'fs';

import *as os from 'os';
if (fs.existsSync('./index1.txt')) {
    fs.appendFile('./index1.txt', `${Date.now()} continue \n`, (err: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    })
} else {
    console.log("file not exist");
}


fs.cpSync('./index1.txt', './index2.txt')
fs.unlinkSync('./index2.txt')
let result=fs.statSync('./index1.txt');
console.log(result.size);

console.log(os.cpus().length);



//! Blocking and Non-blocking Operations
// Blocking operations, with synchronous examples like fs.writeFileSync and fs.readFileSync.
// Non-blocking operations involve callback functions for obtaining results.

//! How NodeJS Works?
// architecture of node js

// The process begins with a client request, which enters the event queue in FIFO order.
// The event loop checks whether the operation is blocking or non-blocking.
// If it's non-blocking, it processes immediately.
// If it's blocking, the operation is sent to the thread pool, where workers perform the task.
// By default, there are four workers in the thread pool. bcz if there are 4 users send the request blocking - then 5the user should wait until any of the workers complete their works
// To increase the number of workers, we can use the number of CPU cores available on the system.



