import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getStatus(exception);
    const message = this.getResponseMessage(exception);

    response.status(status).json({
      statusCode: status,
      path: request.url,
      ...message,
    });
  }

  private getStatus(exception: unknown): number {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getResponseMessage(exception: unknown): object {
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : { message: 'Internal server error' };

    return typeof exceptionResponse === 'string' ? { message: exceptionResponse } : exceptionResponse;
  }
}
