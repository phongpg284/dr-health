import { Test, TestingModule } from '@nestjs/testing';
import { MedicinePrescriptionService } from './medicine-prescription.service';

describe('MedicinePrescriptionService', () => {
  let service: MedicinePrescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicinePrescriptionService],
    }).compile();

    service = module.get<MedicinePrescriptionService>(MedicinePrescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
