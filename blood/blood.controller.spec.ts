import { Test, TestingModule } from '@nestjs/testing';
import { BloodController } from './blood.controller';
import { BloodService } from './blood.service';

describe('BloodController', () => {
  let controller: BloodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodController],
      providers: [BloodService],
    }).compile();

    controller = module.get<BloodController>(BloodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
