import { Test, TestingModule } from '@nestjs/testing';
import { MedicinePrescriptionController } from './medicine-prescription.controller';
import { MedicinePrescriptionService } from './medicine-prescription.service';

describe('MedicinePrescriptionController', () => {
  let controller: MedicinePrescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicinePrescriptionController],
      providers: [MedicinePrescriptionService],
    }).compile();

    controller = module.get<MedicinePrescriptionController>(MedicinePrescriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
