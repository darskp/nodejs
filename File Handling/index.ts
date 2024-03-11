import * as fs from 'fs';


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