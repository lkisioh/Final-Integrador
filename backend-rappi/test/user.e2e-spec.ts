import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from './../src/app.module';

jest.mock('uuid', () => ({
  v4: () => '1234-test-uuid-5678',
}));

describe('UserController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/users (POST) - Debería crear un usuario desde la API', () => {
    const uniqueEmail = `admin-${Date.now()}@test.com`;
    return supertest(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Admin Test',
        email: uniqueEmail,
        password: 'password123',
        addresses: []
      })
      .expect(201) 
      .expect((res) => {
        expect(res.body).toHaveProperty('uuid');
        expect(res.body.name).toEqual('Admin Test');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});