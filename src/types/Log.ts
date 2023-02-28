import Levels from './Levels';

interface Log extends Record<string, any> {
  timestamp: number;
  loglevel: Levels;
  transactionId: string;
  details: string;
  err?: string;
}

export default Log;
