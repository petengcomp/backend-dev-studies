import { Test, TestingModule } from '@nestjs/testing';
import { TrailResolver } from './trail.resolver';
import { TrailService } from './trail.service';

describe('TrailResolver', () => {
  let resolver: TrailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailResolver, TrailService],
    }).compile();

    resolver = module.get<TrailResolver>(TrailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
