import { open } from 'node:fs/promises';
import fs from 'node:fs';

import Levels from './Levels';

interface Log extends Record<string, any> {
  timestamp: Date;
  logLevel: Levels;
  transactionId: string;
  details: string;
  err?: string;
}

class ParserService {
  private generateOutputLine(log: Log, firstLine: boolean) {
    return `${!firstLine ? ',' : ''}\n  ` + JSON.stringify(log);
  }
  private parseLine(line: string): Log {
    const [rawTimestamp, logLevel, logMessage] = line.split(' - ');
    const timestamp = new Date(rawTimestamp).getTime();
    const message = JSON.parse(logMessage);

    return { timestamp, logLevel, ...message };
  }
  async parseLogs(inputPath: string, outputPath: string, logLevels: Levels[]) {
    const inputFile = await open(inputPath);
    const outputFile = fs.createWriteStream(outputPath);
    outputFile.write('[');

    let firstLine = true;

    for await (const line of inputFile.readLines()) {
      const log = this.parseLine(line);

      if (logLevels.includes(log.logLevel)) {
        outputFile.write(this.generateOutputLine(log, firstLine));

        if (firstLine) firstLine = false;
      }
    }
    outputFile.write('\n]');
  }
}

export default ParserService;
