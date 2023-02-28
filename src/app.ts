import ParserService from './ParserService';
import LogSerializer from './Serializers/LogSerializer';
import ArgumentsService from './ArgumentsService';

const argumentsService = new ArgumentsService();

const logSerializer = new LogSerializer();
const parserService = new ParserService(logSerializer);

parserService
  .parseLogs(argumentsService.getInput(), argumentsService.getOutput(), (log) =>
    argumentsService.getLevels().includes(log.loglevel)
  )
  .then(() => console.log('Parsed!'))
  .catch((err) => {
    console.error(err);
    console.log('Failed');
  });
