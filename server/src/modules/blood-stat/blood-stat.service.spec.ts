import { Test, TestingModule } from '@nestjs/testing';
import { BloodStatService } from './blood-stat.service';

describe('BloodStatService', () => {
  let service: BloodStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodStatService],
    }).compile();

    service = module.get<BloodStatService>(BloodStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
