#!/usr/bin/env node

const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function generateHash(password) {
    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error("Error generating the hash:", error);
    }
}

rl.question('Enter the password to generate the hash: ', (password) => {
    generateHash(password).then(hash => {
        if (hash) {
            console.log("Generated hash:", hash);
        }
        rl.close();
    }).catch(error => {
        console.error("Error:", error);
        rl.close();
    });
});