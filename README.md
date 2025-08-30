# bcrypt-gen

[![npm version](https://badge.fury.io/js/bcrypt-gen.svg)](https://badge.fury.io/js/bcrypt-gen)
[![npm downloads](https://img.shields.io/npm/dt/bcrypt-gen.svg)](https://www.npmjs.com/package/bcrypt-gen)
[![license](https://img.shields.io/npm/l/bcrypt-gen.svg)](https://github.com/fabiorecife/bcrypt-gen/blob/main/LICENSE)


`bcrypt-gen` is a command-line tool designed to generate bcrypt hashes conveniently and securely. It provides an easy-to-use interface for hashing passwords directly from the terminal, ensuring enhanced security for your applications.

## Installation

To use `bcrypt-gen`, you can install it globally using npm or use it directly with `npx`.

### Install Globally

```sh
npm install -g bcrypt-gen
```

### Use with npx

You can directly use `npx` without the need for a global installation:

```sh
npx bcrypt-gen
```

## Usage

After installing or using `npx`, you can simply run the following command to generate a bcrypt hash for a password:

```sh
bcrypt-gen
```

or with `npx`:

```sh
npx bcrypt-gen
```

### Examples

#### Interactive Mode

When you run the command without arguments or with the `-i` flag, you will be prompted to enter the password for which you want to generate the hash:

```sh
$ npx bcrypt-gen
Enter the password to generate the hash: 123
Enter the number of salt rounds (or press Enter for default 10): 
Generated hash: $2b$10$JnIM0IXCTThg/oXZ6nJFi.8DakzRT9RgTOCPNJQzAMDVeWA3w2iZ6
```

#### Generate Hash with Default Salt Rounds

You can directly provide a password to hash with default salt rounds (10):

```sh
$ npx bcrypt-gen -p --pwd "mypassword"
Generated hash: $2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Generate Hash with Custom Salt Rounds

You can specify custom salt rounds for stronger hashing:

```sh
$ npx bcrypt-gen -c --pwd "mypassword" --rounds 12
Generated hash: $2b$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Verify a Password Against a Hash

You can verify if a password matches a given hash:

```sh
$ npx bcrypt-gen -v --hash "$2b$10$JnIM0IXCTThg/oXZ6nJFi.8DakzRT9RgTOCPNJQzAMDVeWA3w2iZ6" --pwd "123"
 ✅ Success - Password matches the hash.
```

```sh
$ npx bcrypt-gen -h                                                                     
Usage: bcrypt-gen [options]

Options:
  --version      Show version number                                       [boolean]
  -h, --help     Show this help message                                    [boolean]
  -i, --interactive  Interactive mode with questions for password and rounds
                                                                           [boolean]
  -v, --verify   Verify if the password matches the given hash             [boolean]
  -c, --custom   Generate hash for the given password with custom saltRounds
                                                                           [boolean]
  -p, --password Generate hash for the given password with default saltRounds (10)
                                                                           [boolean]
  --hash         Hash to verify (used with -v)                              [string]
  --pwd          Password to hash or verify                                 [string]
  --rounds       Number of salt rounds (used with -c)                       [number]

Examples:
  bcrypt-gen -i                                  Run in interactive mode
  bcrypt-gen -v --hash "$2b$10$..." --pwd        Verify if password matches hash
  "mypassword"
  bcrypt-gen -c --pwd "mypassword" --rounds 12   Generate hash with custom salt rounds
  bcrypt-gen -p --pwd "mypassword"               Generate hash with default salt rounds
                                                 (10)

```


## Features

- Simple and intuitive CLI interface powered by yargs
- Comprehensive command-line options with long and short forms
- Generates bcrypt hashes securely
- Suitable for quick password hashing needs
- Ideal for developers needing to hash passwords on the fly

## Author

Fabio Almeida - [Github](https://github.com/fabiorecife)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
