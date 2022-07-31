import { Test, TestingModule } from '@nestjs/testing';
import { SupersonicTestController } from './supersonic-test.controller';
import { SupersonicTestService } from './supersonic-test.service';

describe('SupersonicTestController', () => {
  let controller: SupersonicTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupersonicTestController],
      providers: [SupersonicTestService],
    }).compile();

    controller = module.get<SupersonicTestController>(SupersonicTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
