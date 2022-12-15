import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s'
};

export default function () {
  let product_id = Math.floor(Math.random() * 100000 + 900000);
  const res = http.get(`http://localhost:3001/products/${product_id}/styles`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
