import { Test, TestingModule } from '@nestjs/testing';
import { MovementTrackingService } from './movement-tracking.service';

describe('MovementTrackingService', () => {
  let service: MovementTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementTrackingService],
    }).compile();

    service = module.get<MovementTrackingService>(MovementTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
