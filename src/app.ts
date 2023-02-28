import ArgumentsService from './ArgumentsService';
import ParserService from './ParserService';
import LogSerializer from './Serializers/LogSerializer';

const argumentsService = new ArgumentsService();
const logSerializer = new LogSerializer();

const parserService = new ParserService(logSerializer, (log) =>
  argumentsService.getLevels().includes(log.loglevel)
);

parserService
  .parseLogs(argumentsService.getInput(), argumentsService.getOutput())
  .then(() => console.log('Parsed!'))
  .catch((err) => {
    console.error(err);
    console.log('Failed');
  });
