import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

export const options = {
  vus: 5,
  duration: '30s',

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000']
  }
};

const BASE_URL = config.baseUrl;
const API_KEY = config.apiKey;

export default function () {
  const response = http.get(`${BASE_URL}/users/2`, {
    headers: {
      'x-api-key': API_KEY
    }
  });
  
   if (response.status !== 200) {
    console.log(`Status inesperado: ${response.status}`);
    console.log(response.body);
  }

  check(response, {
    'status is 200': (res) => res.status === 200,
    'response time < 1000ms': (res) => res.timings.duration < 1000,
    'has user data': (res) => res.json('data.id') === 2
  });

  sleep(1);
}