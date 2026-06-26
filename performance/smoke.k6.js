import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1
};

const BASE_URL = __ENV.API_BASE_URL || 'https://reqres.in/api';
const API_KEY = __ENV.REQRES_API_KEY;

export default function () {
  const response = http.get(`${BASE_URL}/users/2`, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  console.log(`Status retornado: ${response.status}`);

  check(response, {
    'status is 200': (res) => res.status === 200
  });
}