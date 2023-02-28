import { open } from 'node:fs/promises';
import fs from 'node:fs';

import BaseSerializer from '../Serializers/BaseSerializer';

type filterFunction<T> = (t: T) => boolean;

class ParserService<T> {
  private serializer: BaseSerializer<T>;
  constructor(serializer: BaseSerializer<T>) {
    this.serializer = serializer;
  }
  private generateOutputLine(parsed: T, firstLine: boolean) {
    return `${!firstLine ? ',' : ''}\n  ` + this.serializer.deserialize(parsed);
  }
  async parseLogs(
    inputPath: string,
    outputPath: string,
    filter: filterFunction<T> = () => true
  ) {
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

      if (filter(parsed)) {
        outputFile.write(this.generateOutputLine(parsed, firstLine));

        if (firstLine) firstLine = false;
      }
    }
    outputFile.write(`${firstLine ? '' : '\n'}]`);
  }
}

export default ParserService;
