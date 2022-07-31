import { Test, TestingModule } from '@nestjs/testing';
import { BloodTestStatService } from './blood-test-stat.service';

describe('BloodTestStatService', () => {
  let service: BloodTestStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodTestStatService],
    }).compile();

    service = module.get<BloodTestStatService>(BloodTestStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
