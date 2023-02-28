import { open } from 'node:fs/promises';
import fs from 'node:fs';

import BaseSerializer from '../Serializers/BaseSerializer';

class ParserService<T> {
  serializer: BaseSerializer<T>;
  filter: (parsed: T) => boolean;
  constructor(serializer: BaseSerializer<T>, filter = (parsed: T) => true) {
    this.serializer = serializer;
    this.filter = filter;
  }
  private generateOutputLine(parsed: T, firstLine: boolean) {
    return `${!firstLine ? ',' : ''}\n  ` + this.serializer.deserialize(parsed);
  }
  async parseLogs(inputPath: string, outputPath: string) {
    const inputFile = await open(inputPath);
    const outputFile = fs.createWriteStream(outputPath);
    outputFile.write('[');

    let firstLine = true;

    for await (const line of inputFile.readLines()) {
      const parsed = this.serializer.serialize(line);

      if (!parsed) {
        console.log(`Problem parsing line: ${line}`);
        continue;
      }

      if (this.filter(parsed)) {
        outputFile.write(this.generateOutputLine(parsed, firstLine));

        if (firstLine) firstLine = false;
      }
    }
    outputFile.write('\n]');
  }
}

export default ParserService;
