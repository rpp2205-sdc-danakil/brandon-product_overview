const request = require("supertest");
const mongoose = require('mongoose');
const server = require("./server/index");

describe("Test the root path", () => {
  beforeAll(done => {
    done();
  });

  afterAll(done => {
    mongoose.connection.close();
    server.close();
    done();
  });

  test("SHOULD RETURN ACCURATE PRODUCT DETAILS FOR PRODUCT_ID: 1000011", () => {
    return request(server)
      .get('/products/1000011')
      .then(res => {
        console.log('body', res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body['_id']).toBe(1000011);
        expect(res.body.name).toBe('Evangeline Shoes');
        expect(res.body.description.includes('Consequatur')).toBe(true);
        expect(res.body.slogan.includes('recusandae')).toBe(true);
        expect(res.body.category).toBe('Shoes');
        expect(parseInt(res.body.default_price)).toBe(587);
        expect(typeof res.body.features === 'object').toBe(true);
        expect(res.body.features[0].feature).toBe('Material');
      })
  });

  test("SHOULD RETURN RELATED PRODUCTS FOR PRODUCT_ID: 1000011", () => {
    return request(server)
      .get('/products/1000011/related')
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe('object');
        expect(res.body.length).toBe(6);
        expect(res.body[0]).toBe(275004);
      })
  });

  test("SHOULD RETURN RESULTS (STYLES) ASSOCIATED WITH PRODUCT_ID: 1000011", () => {
    return request(server)
      .get('/products/1000011/styles')
      .then(res => {
        console.log('body', res.body);
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe('object');
        expect(res.body[0].id).toBe(1958098);
        expect(res.body[0].name).toBe('Ivory');
        expect(parseInt(res.body[0].original_price)).toBe(587);
        expect(res.body[0]['default?']).toBe(true);
        expect(res.body[0].photos[0].url).toBe('https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80');
        expect(res.body[0].skus[0].size).toBe('7');
        expect(res.body[0].skus[0].quantity).toBe(2);
      })
  });
});