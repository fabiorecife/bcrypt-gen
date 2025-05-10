#!/usr/bin/env node

const bcrypt = require('bcrypt');
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
// Processando argumentos da CLI
const args = process.argv.slice(2);

if (args.includes('-h')) {
    console.log(`
version 1.1.1
Usage:
  -h            Show this help message
  -i            Interactive mode with questions for password and rounds
  -v <hash> <password> Verify if the password matches the given hash
  -c <password> <saltRounds> Generate hash for the given password with custom saltRounds
  -p <password> Generate hash for the given password with default saltRounds (10)
  No arguments  Default behaviour, asks for all inputs interactively
`);
    rl.close();
} else if (args.includes('-i')) {
    // Modo interativo (padrão existente)
    rl.question('Enter the password to generate the hash: ', (password) => {
        rl.question('Enter the number of salt rounds (or press Enter for default 10): ', (saltInput) => {
            const saltRounds = parseInt(saltInput, 10) || 10; // Padrão para 10 se a entrada for inválida ou vazia
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
} else if (args.includes('-v')) {
    // Modo de verificação
    const index = args.indexOf('-v');
    const hash = args[index + 1]; // Recebe o hash do argumento
    const password = args[index + 2]; // Recebe a senha

    if (!hash || !password) {
        console.error("Error: You must provide a hash and a password with the -v option.");
        console.log("Use -h for help.");
        rl.close();
    } else {
        // Verifica se a senha mata com o hash
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
} else if (args.includes('-c')) {
    // Modo de saltRounds customizados
    const index = args.indexOf('-c');
    const password = args[index + 1];
    const saltRounds = parseInt(args[index + 2], 10);

    if (!password || isNaN(saltRounds)) {
        console.error("Error: You must provide a password and valid saltRounds with the -c option.");
        console.log("Use -h for help.");
        rl.close();
    } else {
        generateHash(password, saltRounds).then(hash => {
            if (hash) {
                console.log("Generated hash:", hash); // Gera o hash com rounds customizados
            }
            rl.close();
        }).catch(error => {
            console.error("Error:", error);
            rl.close();
        });
    }
} else if (args.includes('-p')) {
    // Modo com rounds padrão (10)
    const index = args.indexOf('-p');
    const password = args[index + 1];

    if (!password) {
        console.error("Error: You must provide a password with the -p option.");
        console.log("Use -h for help.");
        rl.close();
    } else {
        generateHash(password).then(hash => {
            if (hash) {
                console.log("Generated hash:", hash); // Mostra o hash gerado com rounds padrão
            }
            rl.close();
        }).catch(error => {
            console.error("Error:", error);
            rl.close();
        });
    }
} else {
    // Padrão: modo interativo
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