import { open } from 'node:fs/promises';
import fs from 'node:fs';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

enum Levels {
  info = 'info',
  debug = 'debug',
  warn = 'warn',
  error = 'error'
}

interface Log extends Record<string, any> {
  timestamp: Date;
  logLevel: Levels;
  transactionId: string;
  details: string;
  err?: string;
}

const argv = yargs(hideBin(process.argv))
    .options({
      input: {
        type: 'string',
        default: 'app.log',
        demandOption: true,
        description: 'Path to the log file'
      },
      output: {
        type: 'string',
        default: 'errors.json',
        demandOption: true,
        description: 'Path to the generated JSON'
      },
      logLevels: {
        type: 'array',
        alias: 'l',
        choices: Object.values(Levels),
        default: Levels.error,
        description: 'Filter by log level'
      }
    })
    .parseSync();

const { input, output, logLevels } = argv;

const parseLine = (line: string): Log => {
  const [rawTimestamp, logLevel, logMessage] = line.split(' - ');
  const timestamp = new Date(rawTimestamp).getTime();
  const message = JSON.parse(logMessage);

  return { timestamp, logLevel, ...message };
};

const generateOutputLine = (log: Log, firstLine: boolean) => {
  return `${!firstLine ? ',' : ''}\n  ` + JSON.stringify(log);
};

const parseLogs = async () => {
  const inputFile = await open(input);
  const outputFile = fs.createWriteStream(output);
  outputFile.write('[');

  let firstLine = true;

  for await (const line of inputFile.readLines()) {
    const log = parseLine(line);

    if (logLevels.includes(log.logLevel)) {
      outputFile.write(generateOutputLine(log, firstLine));

      if (firstLine) firstLine = false;
    }
  }
  outputFile.write('\n]');
};

parseLogs()
    .then(() => console.log('Parsed!'))
    .catch((err) => {
      console.error(err);
      console.log('Failed');
    });
