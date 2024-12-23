import { BadRequestException, HttpStatus, ValidationPipe } from '@nestjs/common';

const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    const transformedErrors = {};
    for (const error of errors) {
      transformedErrors[error.property] = error.constraints[Object.keys(error.constraints)[0]];
    }

    if (transformedErrors) {
      return new BadRequestException({
        error: 'Bad Request',
        message: transformedErrors,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    } else {
      return new BadRequestException(errors);
    }
  },
});

export { GlobalValidationPipe };
