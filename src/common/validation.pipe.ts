import { BadRequestException, ValidationPipe } from '@nestjs/common';

const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    const transformedErrors = {};
    for (const error of errors) {
      transformedErrors[error.property] = Object.values(error.constraints)[0];
    }

    return new BadRequestException({ message: 'Validation failed', errors: transformedErrors });
  },
});

export { GlobalValidationPipe };
