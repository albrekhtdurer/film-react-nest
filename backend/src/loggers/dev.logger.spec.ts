import { DevLogger } from './dev.logger';
import { ConsoleLogger } from '@nestjs/common';

describe('DevLogger', () => {
  let logger: DevLogger;
  const message = 'test message';

  beforeEach(() => {
    logger = new DevLogger();
  });

  it('.log() should call super log method with given message', () => {
    const superLogSpy = jest.spyOn(ConsoleLogger.prototype, 'log');
    logger.log(message);
    expect(superLogSpy).toHaveBeenCalledWith(message);
  });

  it('.error() should call super error method with given message', () => {
    const superLogSpy = jest.spyOn(ConsoleLogger.prototype, 'error');
    logger.error(message);
    expect(superLogSpy).toHaveBeenCalledWith(message);
  });

  it('.warn() should call super warn method with given message', () => {
    const superLogSpy = jest.spyOn(ConsoleLogger.prototype, 'warn');
    logger.warn(message);
    expect(superLogSpy).toHaveBeenCalledWith(message);
  });
});
