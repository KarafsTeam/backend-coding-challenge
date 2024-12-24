import { BadRequestException, ValidationPipe } from '@nestjs/common';

const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    const transformedErrors = errors.map((error) => ({
      field: error.property,
      message: Object.values(error.constraints)[0],
    }));

    return new BadRequestException({
      status: 'error',
      message: 'Validation failed',
      errors: transformedErrors,
    });
  },
});

export { GlobalValidationPipe };
