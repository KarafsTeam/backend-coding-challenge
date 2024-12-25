import { Test, TestingModule } from '@nestjs/testing';
import { WaterTrackingController } from './water-tracking.controller';

describe('WaterTrackingController', () => {
  let controller: WaterTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterTrackingController],
    }).compile();

    controller = module.get<WaterTrackingController>(WaterTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
