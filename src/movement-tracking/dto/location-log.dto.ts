import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsISO8601 } from 'class-validator';

export class PostGpsLocationDto {
  @ApiProperty({ description: 'Latitude of the GPS location', example: 37.7749 })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the GPS location', example: -122.4194 })
  @IsLongitude()
  longitude: number;

  @ApiProperty({ description: 'Timestamp of the GPS location', example: '2023-10-01T12:00:00Z' })
  @IsISO8601()
  timestamp: string;
}
