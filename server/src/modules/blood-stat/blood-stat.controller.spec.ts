import { Test, TestingModule } from '@nestjs/testing';
import { BloodStatController } from './blood-stat.controller';
import { BloodStatService } from './blood-stat.service';

describe('BloodStatController', () => {
  let controller: BloodStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodStatController],
      providers: [BloodStatService],
    }).compile();

    controller = module.get<BloodStatController>(BloodStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
