import { TskvLogger } from './tskv.logger';

describe('Tskv Logger', () => {
  let logger: TskvLogger;
  const initialData = {
    level: 'log',
    message: 'test message',
    optionalParams: [],
  };

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('.log() should send tab-separated string to console.log()', () => {
    const dataString = `level=${initialData.level}\tmessage=${initialData.message}\toptionalParams=${initialData.optionalParams.join(',')}\n`;
    const consoleSpy = jest.spyOn(console, 'log');
    logger.log(initialData.message);
    expect(consoleSpy).toHaveBeenCalledWith(dataString);
  });

  it('.warn() should send tab-separated string to console.warn()', () => {
    const data = {
      ...initialData,
      level: 'warn',
      optionalParams: ['someData', 123],
    };
    const dataString = `level=${data.level}\tmessage=${data.message}\toptionalParams=${data.optionalParams.join(',')}\n`;
    const consoleSpy = jest.spyOn(console, 'warn');
    logger.warn(data.message, ...data.optionalParams);
    expect(consoleSpy).toHaveBeenCalledWith(dataString);
  });

  it('.error() should send tab-separated string to console.error()', () => {
    const data = {
      ...initialData,
      level: 'error',
    };
    const dataString = `level=${data.level}\tmessage=${data.message}\toptionalParams=${data.optionalParams.join(',')}\n`;
    const consoleSpy = jest.spyOn(console, 'error');
    logger.error(data.message);
    expect(consoleSpy).toHaveBeenCalledWith(dataString);
  });
});
