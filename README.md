# Blockchain competition app

Competition app. Users can challenge each other to decide who has better skills/abilities/items/pets etc. 
Community is the only judge. Winner gets a reward.

Implemented ethereum contracts for competitions and in-app coins.
NodeJS server to interact with blockchain.

## Instalation

Install dependencies
```Bash
$ npm intsall
```

Install [truffle](https://github.com/trufflesuite/truffle) for migrations and [testrpc](https://github.com/ethereumjs/testrpc) as your test blockchain environment
```Bash
$ npm install -g truffle ethereumjs-testrpc
```

In the separate terminal run `testrpc`
```Bash
$ testrpc
```

Create `.env` file in the project root with variables as in `.env.example`.
Should be something like:
```
ETHEREUM_HOST=127.0.0.1
ETHEREUM_PORT=8545
```

Migrate the contracts
```Bash
$ truffle migrate
```

Start the server
```Bash
$ npm start
```

Run the tests
```Bash
truffle test
```

Or run the specific test file
```Bash
truffle test path/to/testFile.js
```


