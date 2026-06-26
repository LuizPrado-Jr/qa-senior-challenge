import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 2,
  duration: '10s',

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1500']
  }
};

const BASE_URL = __ENV.API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export default function () {
  const response = http.get(`${BASE_URL}/posts/1`);

  check(response, {
    'status is 200': (res) => res.status === 200,
    'response time < 1500ms': (res) => res.timings.duration < 1500,
    'has post id': (res) => res.json('id') === 1
  });

  sleep(1);
}