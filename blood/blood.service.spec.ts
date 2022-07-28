import { Test, TestingModule } from '@nestjs/testing';
import { BloodService } from './blood.service';

describe('BloodService', () => {
  let service: BloodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodService],
    }).compile();

    service = module.get<BloodService>(BloodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
