import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from 'src/user/user.schema';

// TODO: I'ts recommended to separate token verification and role authorization
//  in different guards, but I put mixed them together for simplicity

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    // Check If token Exists
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const payload = await this.authService.verifyAccessToken(token);

      request['userId'] = payload.id;

      // If we require specific role
      if (requiredRoles && requiredRoles.length) {
        return requiredRoles.some((role) => role === payload.role);
      }

      // If we don't require any roles and user's token is valid
      return true;
    } catch (error) {
      this.logger.error('Error verifying token:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
