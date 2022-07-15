import { Test, TestingModule } from '@nestjs/testing';
import { MedicalThresholdService } from './medical-threshold.service';

describe('MedicalThresholdService', () => {
  let service: MedicalThresholdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalThresholdService],
    }).compile();

    service = module.get<MedicalThresholdService>(MedicalThresholdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
