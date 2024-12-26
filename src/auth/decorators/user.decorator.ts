import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// This decorator is used to extract the userId from the request object
export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.userId as string;
});
