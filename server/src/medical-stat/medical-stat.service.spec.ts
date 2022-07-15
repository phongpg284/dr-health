import { Test, TestingModule } from '@nestjs/testing';
import { MedicalStatService } from './medical-stat.service';

describe('MedicalStatService', () => {
  let service: MedicalStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalStatService],
    }).compile();

    service = module.get<MedicalStatService>(MedicalStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
