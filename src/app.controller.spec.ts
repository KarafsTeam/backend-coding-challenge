import * as request from 'supertest';
import { AppController } from './app.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

describe('App Controller', () => {
  let controller: AppController;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    controller = moduleRef.get<AppController>(AppController);
  });

  beforeEach(() => {
    controller = new AppController();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /health', () => {
    it('status should be ok', async () => {
      return request(app.getHttpServer()).get('/health').expect(200);
    });
  });
});
