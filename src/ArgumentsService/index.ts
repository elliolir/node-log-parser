import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';
import Levels from '../types/Levels';

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
          description: 'Provide the path to the raw log file'
        },
        output: {
          type: 'string',
          default: 'results.json',
          demandOption: true,
          description: 'Provide the path to the parsed output log file'
        },
        logLevels: {
          type: 'array',
          alias: 'l',
          choices: Object.values(Levels),
          default: [Levels.error],
          description: 'Levels of the parsed output logs'
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
