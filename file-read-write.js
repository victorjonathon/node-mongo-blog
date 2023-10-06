const fs = require('fs');

if(!fs.existsSync('./static')){
    fs.mkdir('./static', (err)=>{
        if(err){
            console.log(err)
        }
        fs.writeFile('./static/one.txt',
        `Hey Vikas
        This is second line`, (err) =>{
            console.log('File created')
        }
        )
    });
};