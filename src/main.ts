import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './common/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { EnvironmentVariables } from './common/env.validation';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get env config
  const configService: ConfigService<EnvironmentVariables> = app.get(ConfigService);

  // Swagger config
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);

  // Start the app
  await app.listen(configService.get('BACKEND_PORT'), '0.0.0.0', async () => {
    console.log(`server is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
