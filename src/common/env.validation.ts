import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

enum EnvironmentEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}
export class EnvironmentVariables {
  @IsOptional()
  @IsEnum(EnvironmentEnum)
  NODE_ENV: EnvironmentEnum;

  @IsNotEmpty()
  @IsNumber()
  BACKEND_PORT: number;

  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsNotEmpty()
  @IsString()
  MONGO_DATABASE: string;

  @IsNotEmpty()
  @IsString()
  MONGO_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  MONGO_PASSWORD: string;

  @IsNotEmpty()
  @IsNumber()
  MONGO_PORT: number;

  @IsNotEmpty()
  @IsString()
  MONGO_HOST: string;

  @IsNotEmpty()
  @IsString()
  KAFKA_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  KAFKA_PORT: number;

  @IsNotEmpty()
  @IsNumber()
  ZOOKEEPER_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
