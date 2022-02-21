import app from '../../../app';
import supertest from 'supertest';
import { truncateDB } from '../../../spec/utils';

describe('[E2E] Product', function() {

  describe('Testing the Create endpoint', function() {
    beforeEach(async() => {
      await truncateDB();
    });

    // Success scenarios
    it('creates a Product', async function() {
      // status code should be 201 `Created`
      const response = await supertest(app)
        .post('/products')
        .send({
          name: 'testProduct',
          price: '15000',
        });
      expect(response.statusCode).toBe(201);
    });
  });

  describe('Testing the Show endpoint', function() {
    // beforeEach(async() => {
    //   await truncateDB();
    // });

    // Success scenarios
    it('creates a Product', async function() {
      // status code should be 201 `Created`
      const response = await supertest(app)
        .post('/products')
        .send({
          name: 'testProduct',
          price: '15000',
        });
      expect(response.statusCode).toBe(201);
    });

    it('creates a another Product', async function() {
      // status code should be 201 `Created`
      const response = await supertest(app)
        .post('/products')
        .send({
          name: 'testProduct',
          price: '15000',
        });
      expect(response.statusCode).toBe(201);
    });
    it('Selects The Products', async function() {
      const response = await supertest(app).get('/products');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ name: 'testProduct',price: '15000' });
      await truncateDB();
    });

  });

});
