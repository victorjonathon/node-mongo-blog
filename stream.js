const fs = require('fs');

const readStream = fs.createReadStream('./static/one.txt', {encoding: 'utf-8'})
const writeStream = fs.createWriteStream('./static/two.txt');

// readStream.on('data', (chunk)=>{
//     writeStream.write(chunk);
// });

readStream.pipe(writeStream);