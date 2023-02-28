# node-log-parser

Node.js CLI log parser built with TypeScript.

### Requirements:
* `node.js@19` 

### Set up steps
Just install all the packages with
```bash
npm i
```
Build the standalone application `dist/parser.js`
```bash
npm run build
```

and you're good to go.

### Usage
Basic usage is 
```bash
node dist/parser.js --input ./app.log --output ./logs.json -l warn 
```
It will try to open up the `app.log` file, parse logs and generate the output with the `warn` level ones into the `./logs.json`

### Options
```
Options:
  --input <value...>                          Provide the path to the raw log file. Default is `app.log`
  --output <value...>                         Provide the path to the parsed output log file. Default is `results.json`
  --logLevels, 
    -l [info | debug | warn | error]          Levels of the parsed output logs. Default is `error`
    
Global options:
  --help                                      Display help for commands and options.
```

### Available commands
* `npm start` — self-testing run of the CLI with the pre-defined parameters;
* `npm run build` — build the standalone `dist/parser.js` so it can be run manually as a Node CLI;
* `npm test` — runs `jest`-based unit tests;
* `npm run lint` and `npm run lint:fix` — checks and fixes styling issues respectively;