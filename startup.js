const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Do you want to register commands? (y/n) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
        rl.question('Register global or dev commands? (g/d) ', (type) => {
            if (type.toLowerCase() === 'g') {
                require('./src/registerGlobalCommands');
            } else if (type.toLowerCase() === 'd') {
                require('./src/registerDevCommands');
            }
            rl.close();
        });
    } else {
        rl.close();
    }});