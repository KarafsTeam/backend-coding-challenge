import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { SignUpDTO } from './dto/signup.dto';
import { SigninDTO } from './dto/signin.dto';
import { AccessTokenPayload, RefreshTokenPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/common/env.validation';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private configService: ConfigService<EnvironmentVariables>,
  ) {}

  async signup({ email, password, role }: SignUpDTO) {
    const existingEmail = await this.userRepository.findOne({ email });
    if (existingEmail) throw new ConflictException('Email already exists.');

    const passwordHash = await this.getPasswordHash(password);

    const user = await this.userRepository.create({
      role: role,
      email: email,
      password: passwordHash,
    });

    return user;
  }

  async signin(loginUserDto: SigninDTO) {
    const { email, password } = loginUserDto;

    // Find user by email address
    const user = await this.userRepository.findOne({ email });

    // Check user exists
    if (!user) throw new BadRequestException('User Does not exist.');

    // Check for matching user password
    const passwordIsMatched = await this.verifyPasswordHash(password, user.password);
    if (!passwordIsMatched) throw new BadRequestException("Password didn't matched !");

    // Generate Tokens
    const refreshToken = await this.getRefreshToken(user._id.toString());
    const accessToken = await this.getAccessToken(user._id.toString(), user.role);

    return { refreshToken, accessToken };
  }

  private async getPasswordHash(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    } catch (error) {
      this.logger.error('Error generating password hash:', error);
      throw new InternalServerErrorException('Error generating password hash');
    }
  }

  async verifyPasswordHash(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      this.logger.error('Error verifying password hash:', error);
      throw new InternalServerErrorException('Error verifying password hash');
    }
  }

  async getRefreshToken(id: string): Promise<string> {
    const payload: RefreshTokenPayload = {
      id: id.toString(),
      iat: Date.now(), // current time in milliseconds
      exp: Date.now() + 1000 * 60 * 60 * 24 * 30, // one month
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });

    return token;
  }

  async getAccessToken(id: string, role: UserRole): Promise<string> {
    const payload: AccessTokenPayload = {
      role,
      id: id.toString(),
      iat: Date.now(), // current time in milliseconds
      exp: Date.now() + 1000 * 60 * 60 * 4, // 4 hours
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    return token;
  }

  async verifyRefreshToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync<RefreshTokenPayload>(token, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      // check token expiration time
      if (decoded.exp && decoded.exp < Date.now()) throw new BadRequestException();

      return decoded;
    } catch (error) {
      this.logger.error('Error in verifying refresh token:', error);
      throw new UnauthorizedException('Token is not valid.');
    }
  }

  async verifyAccessToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });

      // check token expiration time
      if (decoded.exp && decoded.exp < Date.now()) throw new BadRequestException();

      return decoded;
    } catch (error) {
      this.logger.error('Error in verifying access token:', error);
      throw new UnauthorizedException('Token is not valid.');
    }
  }
}
