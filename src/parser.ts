const logFile = 'app.log';

import { open } from 'node:fs/promises';

const parseLine = (line: string) => {
  const [timestamp, logLevel, logMessage] = line.split(' - ');
  const message = JSON.parse(logMessage);
  return { timestamp, logLevel, ...message };
};

const parseLogs = async () => {
  const file = await open(logFile);

  for await (const line of file.readLines()) {
    console.log(parseLine(line));
  }
};

parseLogs();
