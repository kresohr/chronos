import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: Implement global validationpipe so I don't repeat myself
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
