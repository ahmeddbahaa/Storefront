import app from '../../../app';
import supertest from 'supertest';
import { addTestUser, truncateDB, login } from '../../../spec/utils';
import { IUser } from '../user/user.interfaces';

describe('[E2E] Product', function() {

  describe('Testing the Create endpoint', function() {
    beforeEach(async() => {
      await truncateDB();
    });
    // Success scenarios
    it('Login Then Creates a Product', async function() {
      // status code should be 201 `Created`
      const testUser = await addTestUser();
      const token = await login(testUser as unknown as IUser);
      const response = await supertest(app)
        .post('/products')
        .set({Authorization:'Bearer '+token})
        .send({
          name: 'testProduct',
          price: '15000',
        });
      expect(response.statusCode).toBe(201);
    });
  });

  describe('Testing the Show endpoint', function() {
    it('Selects The Products', async function() {
      const response = await supertest(app).get('/products');
      expect(response.statusCode).toBe(200);
    });

  });

});
