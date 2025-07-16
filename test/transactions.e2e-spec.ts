import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

// E2E tests for TransactionsController
// It tests the creation, confirmation, retrieval of transactions and their items.
describe('TransactionsController (e2e)', () => {
  let app: INestApplication;
  let db: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    db = moduleFixture.get(DataSource);
  });

  afterAll(async () => {
    await db.destroy();
    await app.close();
  });

  let transactionId: string;

  it('/POST /transactions', async () => {
    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        customerId: 'abc123',
        products: [
          { productId: 'p1', quantity: 1 },
          { productId: 'p2', quantity: 2 },
        ],
      })
      .expect(201);

    expect(response.body.id).toBeDefined();
    transactionId = response.body.id;
  });

  it('/PATCH /transactions/:id/confirm', async () => {
    await request(app.getHttpServer())
      .patch(`/transactions/${transactionId}/confirm`)
      .send({ status: 'accepted' })
      .expect(200);
  });

  it('/GET /transactions', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/GET /transactions/:id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/transactions/${transactionId}`)
      .expect(200);

    expect(response.body.id).toBe(transactionId);
    expect(response.body.items.length).toBeGreaterThan(0);
  });
});
