#!/usr/bin/env node

const bcrypt = require('bcrypt');
const yargs = require('yargs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function generateHash(password, saltRounds = 10) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error("Error generating the hash:", error);
    }
}

async function verifyHash(hash, password) {
    try {
        // Verifica se o hash tem o formato básico de um hash Bcrypt
        if (!hash.startsWith("$2b$") && !hash.startsWith("$2a$") && !hash.startsWith("$2y$")) {
            console.error("Invalid hash format. Please make sure the hash is correct.");
            return false;
        }

        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        console.error("Error verifying the hash:", error);
        return false;
    }
}
// Interactive mode function
function runInteractiveMode() {
    rl.question('Enter the password to generate the hash: ', (password) => {
        rl.question('Enter the number of salt rounds (or press Enter for default 10): ', (saltInput) => {
            const saltRounds = parseInt(saltInput, 10) || 10;
            generateHash(password, saltRounds).then(hash => {
                if (hash) {
                    console.log("Generated hash:", hash);
                }
                rl.close();
            }).catch(error => {
                console.error("Error:", error);
                rl.close();
            });
        });
    });
}

// Configure yargs
const argv = yargs
    .usage('Usage: $0 [options]')
    .version('1.1.1')
    .option('h', {
        alias: 'help',
        describe: 'Show this help message',
        type: 'boolean'
    })
    .option('i', {
        alias: 'interactive',
        describe: 'Interactive mode with questions for password and rounds',
        type: 'boolean'
    })
    .option('v', {
        alias: 'verify',
        describe: 'Verify if the password matches the given hash',
        type: 'boolean'
    })
    .option('c', {
        alias: 'custom',
        describe: 'Generate hash for the given password with custom saltRounds',
        type: 'boolean'
    })
    .option('p', {
        alias: 'password',
        describe: 'Generate hash for the given password with default saltRounds (10)',
        type: 'boolean'
    })
    .option('hash', {
        describe: 'Hash to verify (used with -v)',
        type: 'string'
    })
    .option('pwd', {
        describe: 'Password to hash or verify',
        type: 'string'
    })
    .option('rounds', {
        describe: 'Number of salt rounds (used with -c)',
        type: 'number'
    })
    .example('$0 -i', 'Run in interactive mode')
    .example('$0 -v --hash "$2b$10$..." --pwd "mypassword"', 'Verify if password matches hash')
    .example('$0 -c --pwd "mypassword" --rounds 12', 'Generate hash with custom salt rounds')
    .example('$0 -p --pwd "mypassword"', 'Generate hash with default salt rounds (10)')
    .help('h')
    .argv;

// Process commands based on yargs arguments
if (argv.v) {
    // Verify mode
    const hash = argv.hash;
    const password = argv.pwd;

    if (!hash || !password) {
        console.error("Error: You must provide a hash and a password with the -v option.");
        console.log("Use -h for help.");
        rl.close();
    } else {
        verifyHash(hash, password).then(isMatch => {
            if (isMatch) {
                console.log(" ✅ Success - Password matches the hash.");
            } else {
                console.error("❌ Error - Password does not match the hash.");
            }
            rl.close();
        }).catch(error => {
            console.error("Error:", error);
            rl.close();
        });
    }
} else if (argv.c) {
    // Custom salt rounds mode
    const password = argv.pwd;
    const saltRounds = argv.rounds;

    if (!password || isNaN(saltRounds)) {
        console.error("Error: You must provide a password and valid saltRounds with the -c option.");
        console.log("Use -h for help.");
        rl.close();
    } else {
        generateHash(password, saltRounds).then(hash => {
            if (hash) {
                console.log("Generated hash:", hash);
            }
            rl.close();
        }).catch(error => {
            console.error("Error:", error);
            rl.close();
        });
    }
} else if (argv.p) {
    // Default salt rounds mode
    const password = argv.pwd;

    if (!password) {
        console.error("Error: You must provide a password with the -p option.");
        console.log("Use -h for help.");
        rl.close();
    } else {
        generateHash(password).then(hash => {
            if (hash) {
                console.log("Generated hash:", hash);
            }
            rl.close();
        }).catch(error => {
            console.error("Error:", error);
            rl.close();
        });
    }
} else if (argv.i || Object.keys(argv).length <= 2) {
    // Interactive mode (either explicitly requested or default behavior)
    runInteractiveMode();
}
