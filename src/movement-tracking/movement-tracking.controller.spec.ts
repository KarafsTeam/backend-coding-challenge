import { Test, TestingModule } from '@nestjs/testing';
import { MovementTrackingController } from './movement-tracking.controller';

describe('MovementTrackingController', () => {
  let controller: MovementTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementTrackingController],
    }).compile();

    controller = module.get<MovementTrackingController>(MovementTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
