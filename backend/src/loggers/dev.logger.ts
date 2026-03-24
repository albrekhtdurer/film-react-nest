import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: string) {
    const logMessage = `[DEV DEBUG] ${message}`;
    super.log(logMessage);
  }

  error(message: string) {
    const logMessage = `[DEV ERROR] ${message}`;
    super.error(logMessage);
  }
}
