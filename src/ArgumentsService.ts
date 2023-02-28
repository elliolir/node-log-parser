import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';
import Levels from './Levels';

interface Params {
  input: string;
  output: string;
  logLevels: Levels[];
}

class ArgumentsService {
  private argv: Arguments<Params>;

  constructor() {
    this.argv = yargs(hideBin(process.argv))
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
          default: [Levels.error],
          description: 'Filter by log level'
        }
      })
      .parseSync();
  }

  getInput(): string {
    return this.argv.input;
  }

  getOutput(): string {
    return this.argv.output;
  }

  getLevels(): Levels[] {
    return this.argv.logLevels;
  }
}

export default ArgumentsService;
