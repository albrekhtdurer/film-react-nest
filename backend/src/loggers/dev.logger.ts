import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  constructor() {
    super('DEV DEBUG');
  }
  log(message: string) {
    super.log(message);
  }

  error(message: string) {
    super.error(message);
  }
}
