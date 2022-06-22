import { Test, TestingModule } from '@nestjs/testing';
import { MedicalThresholdController } from './medical-threshold.controller';
import { MedicalThresholdService } from './medical-threshold.service';

describe('MedicalThresholdController', () => {
  let controller: MedicalThresholdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalThresholdController],
      providers: [MedicalThresholdService],
    }).compile();

    controller = module.get<MedicalThresholdController>(MedicalThresholdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
