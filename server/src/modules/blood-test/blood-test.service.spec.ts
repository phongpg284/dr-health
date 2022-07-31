import { Test, TestingModule } from '@nestjs/testing';
import { BloodTestService } from './blood-test.service';

describe('BloodTestService', () => {
  let service: BloodTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodTestService],
    }).compile();

    service = module.get<BloodTestService>(BloodTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
