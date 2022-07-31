import { Test, TestingModule } from '@nestjs/testing';
import { BloodTestController } from './blood-test.controller';
import { BloodTestService } from './blood-test.service';

describe('BloodTestController', () => {
  let controller: BloodTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodTestController],
      providers: [BloodTestService],
    }).compile();

    controller = module.get<BloodTestController>(BloodTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
