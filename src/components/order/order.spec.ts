import app from '../../../app';
import supertest from 'supertest';
import { addTestUser, truncateDB, login } from '../../../spec/utils';
import { IUser } from '../user/user.interfaces';

describe('[E2E] Order', function() {

  describe('Testing the Create endpoint', function() {
    beforeEach(async() => {
      await truncateDB();
    });
    // Success scenarios
    it('Login Then Creates a Order', async function() {
      // status code should be 201 `Created`
      const testUser = await addTestUser();
      const token = await login(testUser as unknown as IUser);
      const response = await supertest(app)
        .post('/orders')
        .set({Authorization:'Bearer '+token})
        .send({
          user_id: testUser.id,
          order_status: 'active',
        });
      expect(response.statusCode).toBe(201);
    });
  });

  describe('Testing the Show endpoint', function() {
    it('Selects All Orders', async function() {
      const response = await supertest(app).get('/orders');
      expect(response.statusCode).toBe(200);
    });

  });

});
