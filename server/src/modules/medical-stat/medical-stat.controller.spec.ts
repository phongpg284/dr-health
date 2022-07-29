import { Test, TestingModule } from '@nestjs/testing';
import { MedicalStatController } from './medical-stat.controller';
import { MedicalStatService } from './medical-stat.service';

describe('MedicalStatController', () => {
  let controller: MedicalStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalStatController],
      providers: [MedicalStatService],
    }).compile();

    controller = module.get<MedicalStatController>(MedicalStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
