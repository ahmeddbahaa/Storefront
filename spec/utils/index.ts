import supertest from 'supertest';
import app from '../../app';
import Common from '../../src/utils/common';
import { ICreateUser, IUser } from '../../src/components/user/user.interfaces';
const truncateDB = async () => {
  await Common.dbTruncate();
};

const addTestUser = async () => {
  const testUser:ICreateUser = {
    firstname: 'test',
    lastname: 'test',
    email:'admin@example.com',
    password: '123456789',
  };
  const user = await Common.dbInsertion('users', testUser);
  if( user == undefined)
    return null;
  return user.data[0];
};
const login = async (user:IUser) => {
  const response = await supertest(app).post('/login').send(user);
  const token = response.body.token;
  return token;
};

export { truncateDB, addTestUser, login};
