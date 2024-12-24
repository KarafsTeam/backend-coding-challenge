import { BadRequestException, ValidationPipe } from '@nestjs/common';

const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    return new BadRequestException({
      errors,
      status: 'error',
      message: 'Validation failed',
    });
  },
});

export { GlobalValidationPipe };
