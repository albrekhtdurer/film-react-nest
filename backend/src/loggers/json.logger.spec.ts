import { JsonLogger } from './json.logger';

describe('Json Logger', () => {
  let logger: JsonLogger;
  const initialData = {
    level: 'log',
    message: 'test message',
    optionalParams: [],
  };

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('.log() should send JSON to console.log()', () => {
    const dataJson = JSON.stringify(initialData);
    const consoleSpy = jest.spyOn(console, 'log');
    logger.log(initialData.message);
    expect(consoleSpy).toHaveBeenCalledWith(dataJson);
  });

  it('.warn() should send JSON to console.warn()', () => {
    const data = {
      ...initialData,
      level: 'warn',
      optionalParams: ['someData', 123],
    };
    const dataJson = JSON.stringify(data);
    const consoleSpy = jest.spyOn(console, 'warn');
    logger.warn(data.message, ...data.optionalParams);
    expect(consoleSpy).toHaveBeenCalledWith(dataJson);
  });

  it('.error() should send JSON to console.error()', () => {
    const data = {
      ...initialData,
      level: 'error',
    };
    const dataJson = JSON.stringify(data);
    const consoleSpy = jest.spyOn(console, 'error');
    logger.error(data.message);
    expect(consoleSpy).toHaveBeenCalledWith(dataJson);
  });
});
