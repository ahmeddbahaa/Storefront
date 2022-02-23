import app from '../../../app';
import supertest from 'supertest';
import { addTestUser, truncateDB, login } from '../../../spec/utils';
import { IUser } from '../user/user.interfaces';

describe('[E2E] Product Category', function() {

  describe('Testing the Create endpoint', function() {
    beforeEach(async() => {
      await truncateDB();
    });
    // Success scenarios
    it('Creates a Product Category', async function() {
      // status code should be 201 `Created`
      const testUser = await addTestUser();
      const token = await login(testUser as unknown as IUser);
      const response = await supertest(app)
        .post('/categories')
        .send({
          name: 'Makeup',
        });
      expect(response.statusCode).toBe(201);
    });
  });
});
