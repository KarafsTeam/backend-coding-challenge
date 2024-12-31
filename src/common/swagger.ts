import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Karafs Swagger')
  .setDescription('This is the Karafs API documentation')
  .addBearerAuth()
  .build();

export { swaggerConfig };
