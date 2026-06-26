import { test, expect } from '@playwright/test';
import { UserService } from '../../services/UserService';
import apiData from '../../data/apiData.json';
import { env } from '../../utils/env';

test.describe('API - Users', () => {
  let userService: UserService;

  test.beforeEach(async ({ request }) => {
    userService = new UserService(
      request,
      env.apiBaseUrl,
      env.reqresApiKey
    );
  });

  test('Should return user with status 200', async () => {
    const response = await userService.getUserById(2);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data.id).toBe(2);
    expect(body.data.email).toBe(apiData.user.email);
  });

  test('Should return 404 when user does not exist', async () => {
    const response = await userService.getUserById(999);

    expect(response.status()).toBe(404);
  });

  test('Should create user with dynamic data', async () => {
    const payload = {
      name: `Luiz_${Date.now()}`,
      job: apiData.user.job
    };

    const response = await userService.createUser(payload);

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
  });

  test('Should update user', async () => {
    const payload = {
      name: 'Luiz Updated',
      job: 'QA Lead'
    };

    const response = await userService.updateUser(2, payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
  });

  test('Should delete user', async () => {
    const response = await userService.deleteUser(2);

    expect(response.status()).toBe(204);
  });
});