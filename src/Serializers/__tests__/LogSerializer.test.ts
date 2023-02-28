import LogSerializer from '../LogSerializer';
import Log from '../../types/Log';

const logSerializer = new LogSerializer();

const inputLog =
  '2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}';

const serializedLog = {
  timestamp: 2354321571253,
  loglevel: 'info',
  transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
  details: 'Service is started'
} as Log;

describe('LogSerializer - serialize', () => {
  it('parses a log line into an object', () => {
    const res = logSerializer.serialize(inputLog);

    expect(res).toEqual(serializedLog);
  });

  it('fails if the string is corrupted', () => {
    const line =
      '2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa8';

    const res = logSerializer.serialize(line);
    expect(res).toBe(null);
  });
});

describe('LogSerializer - deserialize', () => {
  it('parses an object into the JSON line', () => {
    const res = logSerializer.deserialize(serializedLog);
    const deserialized =
      '{"timestamp":2354321571253,"loglevel":"info","transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}';

    expect(res).toEqual(deserialized);
  });
  it('returns an empty string in case of cyclic object value', () => {
    const obj = {} as any;
    obj.a = { b: obj };

    expect(logSerializer.deserialize(obj)).toBe('');
  });
});
