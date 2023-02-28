const inputLogs = '{"a": 1}\n{"b": 2}';
const corruptedLogs = '{"a": 1}\n{"b": ';
const outputFullLogs = `[
  {"a":1},
  {"b":2}
]`;
const outputSelectedLogs = `[
  {"a":1}
]`;

const outputEmptyLog = '[]';

export {
  inputLogs,
  corruptedLogs,
  outputFullLogs,
  outputSelectedLogs,
  outputEmptyLog
};
