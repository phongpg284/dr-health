import { Test, TestingModule } from '@nestjs/testing';
import { SupersonicTestService } from './supersonic-test.service';

describe('SupersonicTestService', () => {
  let service: SupersonicTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupersonicTestService],
    }).compile();

    service = module.get<SupersonicTestService>(SupersonicTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
