import { Test, TestingModule } from '@nestjs/testing';
import { BloodTestStatController } from './blood-test-stat.controller';
import { BloodTestStatService } from './blood-test-stat.service';

describe('BloodTestStatController', () => {
  let controller: BloodTestStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodTestStatController],
      providers: [BloodTestStatService],
    }).compile();

    controller = module.get<BloodTestStatController>(BloodTestStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
