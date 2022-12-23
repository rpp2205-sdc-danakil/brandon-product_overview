import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s'
};

export default function () {
  let product_id = Math.floor(Math.random() * 100000 + 900000);
  const responses = http.batch([
    ['GET', `http://localhost:3001/products/${product_id}/styles`]
  ]);
  check(responses[0], {
    'status was 200': (res) => res.status === 200,
  });
  sleep(1);
}

// ['GET', 'http://localhost:3001/products'],
// ['GET', `http://localhost:3001/products/${product_id}`],
// ['GET', `http://localhost:3001/products/${product_id}/styles`],
// ['GET', `http://localhost:3001/products/${product_id}/related`]