import BaseSerializer from './BaseSerializer';
import Log from '../types/Log';

class LogSerializer extends BaseSerializer<Log> {
  private linePattern = /^(\S+) - (\S+) - (.+)$/;

  serialize(line: string): Log | null {
    try {
      const match = line.match(this.linePattern);
      if (!match) {
        throw new Error(`Invalid log line: ${line}`);
      }

      const [, rawTimestamp, loglevel, logMessage] = match;
      const timestamp = new Date(rawTimestamp).getTime();
      const message = JSON.parse(logMessage);

      return { timestamp, loglevel, ...message };
    } catch (e) {
      console.error(e);

      return null;
    }
  }
  deserialize(log: Log): string {
    try {
      return JSON.stringify(log);
    } catch (e) {
      console.error(e);

      return '';
    }
  }
}

export default LogSerializer;
