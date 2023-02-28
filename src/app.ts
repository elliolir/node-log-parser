import ArgumentsService from './ArgumentsService';
import ParserService from './ParserService';

const parserService = new ParserService();
const argumentsService = new ArgumentsService();

parserService
  .parseLogs(
    argumentsService.getInput(),
    argumentsService.getOutput(),
    argumentsService.getLevels()
  )
  .then(() => console.log('Parsed!'))
  .catch((err) => {
    console.error(err);
    console.log('Failed');
  });
