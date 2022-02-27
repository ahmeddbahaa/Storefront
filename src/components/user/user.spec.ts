import app from '../../../app';
import supertest from 'supertest';
import { truncateDB, addTestUser, login } from '../../../spec/utils';
import { IUser } from './user.interfaces';
import User from './user.model';

describe('[E2E] User', function () {
  describe('Testing the signup endpoint', function () {
    beforeEach(async () => {
      await truncateDB();
    });

    // Success scenarios
    it('creates an account', async function () {
      const newUser = {
        firstname: 'test',
        lastname: 'test',
        email: 'test@example.com',
        password: '123456789',
      };
      const testUser = await addTestUser();
      const token = await login(testUser as unknown as IUser);
      const res = await supertest(app).post('/users')
        .set({Authorization:'Bearer '+token})
        .send(newUser);
      expect(res.statusCode).toEqual(201);
    });

    // Failure scenarios
    it('returns 400 if an account existed with the same email address', async function () {
      // status code should be 201 `Created`
      const testUser = await addTestUser();
      const token = await login(testUser as unknown as IUser);
      const res = await supertest(app).post('/users')
        .set({Authorization:'Bearer '+token})
        .send(testUser as unknown as object);
      expect(res.statusCode).toEqual(400);
    });
  });
  describe('Testing User Model Functions', function () {
    afterAll(async () => {
      await truncateDB();
    });
    it('Tests User model create function', async function () {
      const newUser = {
        firstname: 'test',
        lastname: 'test',
        email: 'test@example.com',
        password: '123456789',
      };
      const users = await User.create(newUser);
      expect(users).toBeTruthy();
    });
    it('Tests User model findAll function', async function () {
      const users = await User.findAll();
      expect(users).toBeTruthy();
    });
    it('Tests User model findOneByEmail function', async function () {
      const users = await User.findAll();
      if(users) {
        const user = await User.findOneByEmail(users[0].email);
        expect(users).toBeTruthy();
      }
    });
  });
});
