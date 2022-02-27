import app from '../../../app';
import supertest from 'supertest';
import { addTestUser, truncateDB, login } from '../../../spec/utils';
import { IUser } from '../user/user.interfaces';
import Products from './product.model';

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
          name: 'test Product',
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

  describe('Testing the Product Model', async function() {
    beforeAll(async function() {
      await truncateDB();
    });
    afterAll(async()=> {
      await truncateDB();
    });
    it('Test Products Model Create function', async function() {
      const dataObject = {
        name:'test Product',
        price: 15000,
      };
      const product = await Products.create(dataObject);
      if(product){
        expect(product.name).toBe('test Product');
        expect(product.price).toBe(15000);
      }
    });
    it('Test Products Model find function', async function() {
      const product = await Products.findAll();
      if(product){
        expect(product[0].name).toBe('test Product');
        expect(product[0].price).toBe(15000);
      }
    });
  });

});
