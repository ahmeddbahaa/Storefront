import { truncateDB } from '../../spec/utils';
import {ICreateUser} from '../components/user/user.interfaces';
import Common from './common';
import {addTestUser} from '../../spec/utils/index';

describe('[E2E] Database Operations', function() {

  describe('Insert Database Operation', function() {
    beforeAll(async() => {
      await truncateDB();
    });
    // Success scenarios
    it('Insert a Test User', async function() {
      // status code should be 201 `Created`
      const testUser:ICreateUser = {
        firstname: 'test',
        lastname: 'test',
        email:'admin@example.com',
        password: '123456789',
      };
      const user = await Common.dbInsertion('users', testUser);
      expect(user?.data[0]).toBeTruthy();
    });
  });
  describe('Select Database Operation', function() {
    beforeAll(async() => {
      await truncateDB();
    });
    // Success scenarios
    it('Creates a Test User', async function() {
      // status code should be 201 `Created`
      const testUser:ICreateUser = {
        firstname: 'test',
        lastname: 'test',
        email:'admin@example.com',
        password: '123456789',
      };
      const user = await Common.dbInsertion('users', testUser);
      expect(user?.data[0]).toBeTruthy();
    });
    it('Show The Test User by Email', async function() {
    // status code should be 201 `Created`
      const user = await Common.dbFetch('users', {email:'admin@example.com'});
      expect(user?.[0]).toBeTruthy();
    });
    it('index The Test Users', async function() {
      // status code should be 201 `Created`
      const user = await Common.dbFetch('users');
      expect(user?.[0]).toBeTruthy();
    });
  });

});
