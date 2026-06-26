import { test, expect } from '@playwright/test';
import { AuthService } from '../../services/AuthService';
import apiData from '../../data/apiData.json';

const baseUrl = process.env.API_BASE_URL as string;
const apiKey = process.env.REQRES_API_KEY as string;

test.describe('API - Auth', () => {
  let authService: AuthService;

  test.beforeEach(async ({ request }) => {
    authService = new AuthService(request, baseUrl, apiKey);
  });

  test('Should login successfully', async () => {
    const response = await authService.login(apiData.validLogin);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('token');
  });

  test('Should not login without password', async () => {
    const response = await authService.login(apiData.invalidLogin);
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body).toHaveProperty('error');
  });
});