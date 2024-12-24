import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { SignUpDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async signup(dto: SignUpDTO) {
    await this.validateSignUpDTO(dto);

    const passwordHash = await this.getPasswordHash(dto.password);

    const user = await this.userRepository.create({
      role: dto.role,
      email: dto.email,
      password: passwordHash,
    });

    return user;
  }

  private async validateSignUpDTO({ email }: SignUpDTO) {
    const existingEmail = await this.userRepository.findOne({ email });
    if (existingEmail) throw new ConflictException('Email already exists.');
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
}
