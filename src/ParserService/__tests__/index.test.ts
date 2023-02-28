import mock from 'mock-fs';
import { readFileSync } from 'fs';

import ParserService from '../index';
import MockedSerializer from '../__mocks__/MockedSerializer';
import {
  inputLogs,
  corruptedLogs,
  outputSelectedLogs,
  outputFullLogs,
  outputEmptyLog
} from '../__mocks__/log.mocks';

const mockedSerializer = new MockedSerializer();
const parser = new ParserService(mockedSerializer);

const inputFile = 'inputLog';
const corruptedFile = 'corruptedLog';
const outputFile = 'output.json';

describe('ParserService - parseLogs', () => {
  beforeAll(() => {
    mock({
      [inputFile]: inputLogs,
      [corruptedFile]: corruptedLogs
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it('parses the log and saves it into the separate file', async () => {
    await parser.parseLogs(inputFile, outputFile);

    const result = readFileSync(outputFile, 'utf8');

    expect(result).toEqual(outputFullLogs);
  });
  it('parses the log and saves the filtered results into the separate file', async () => {
    await parser.parseLogs(inputFile, outputFile, (log) => log.a === 1);

    const result = readFileSync(outputFile, 'utf8');

    expect(result).toEqual(outputSelectedLogs);
  });
  it('parses the log and ignores fault lines', async () => {
    await parser.parseLogs(corruptedFile, outputFile);

    const result = readFileSync(outputFile, 'utf8');

    expect(result).toEqual(outputSelectedLogs);
  });
  it('parses the log and saves empty results', async () => {
    await parser.parseLogs(inputFile, outputFile, (log) => log.y === true);

    const result = readFileSync(outputFile, 'utf8');

    expect(result).toEqual(outputEmptyLog);
  });
});
