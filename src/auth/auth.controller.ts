import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully signed up' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async signupUser(@Body() body: SignUpDTO) {
    return await this.authService.signup(body);
  }
}
