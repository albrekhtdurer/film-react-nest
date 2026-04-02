import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { TskvLogger } from './loggers/tskv.logger';
import { ConfigService } from '@nestjs/config';
import { JsonLogger } from './loggers/json.logger';
import { DevLogger } from './loggers/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const loggerType = configService.get<string>('LOGGER');
  const logger =
    loggerType === 'json'
      ? new JsonLogger()
      : loggerType === 'tskv'
        ? new TskvLogger()
        : new DevLogger();

  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(logger);
  console.log('CD successful');
  await app.listen(3000);
}
bootstrap();
