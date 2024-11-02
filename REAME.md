# bcrypt-gen

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

### Example

When you run the command, you will be prompted to enter the password for which you want to generate the hash:

```sh
$ npx bcrypt-gen
Enter the password to generate the hash: mypassword
Generated hash: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36LgNG8nWQzHA5sz8UCeQKG
```

## Features

- Simple and intuitive CLI interface
- Generates bcrypt hashes securely
- Suitable for quick password hashing needs
- Ideal for developers needing to hash passwords on the fly

## Author

Fabio Almeida - [Github](https://github.com/fabiorecife)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.