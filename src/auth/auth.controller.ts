import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupRequestDTO, SignupResponseDTO } from './dto/signup.dto';
import { SigninRequestDTO, SigninResponseDTO } from './dto/signin.dto';
import { GetNewTokenRequestDto } from './dto/access-token.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiOkResponse({ type: SignupResponseDTO, description: 'User successfully signed up' })
  async signupUser(@Body() body: SignupRequestDTO) {
    return await this.authService.signup(body);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in an existing user and obtain new tokens' })
  @ApiOkResponse({ type: SigninResponseDTO, description: 'User successfully signed in' })
  async loginUser(@Body() body: SigninRequestDTO) {
    return await this.authService.signin(body);
  }

  @Post('/token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renew access token using a refresh token' })
  @ApiOkResponse({ type: SigninResponseDTO, description: 'New access token generated' })
  async renewAccessToken(@Body() body: GetNewTokenRequestDto) {
    return this.authService.getNewTokens(body);
  }
}
