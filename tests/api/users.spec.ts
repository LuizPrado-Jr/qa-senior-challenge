import { test, expect } from '@playwright/test';
import { UserService } from '../../services/UserService';
import apiData from '../../data/apiData.json';

const baseUrl = process.env.API_BASE_URL as string;
const apiKey = process.env.REQRES_API_KEY as string;

test.describe('API - Users', () => {
  let userService: UserService;

  test.beforeEach(async ({ request }) => {
    userService = new UserService(request, baseUrl, apiKey);
  });

  test('Should return user with status 200', async () => {
    const response = await userService.getUserById(2);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.data).toHaveProperty('id', 2);
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('first_name');
    expect(body.data).toHaveProperty('last_name');
  });

  test('Should return 404 when user does not exist', async () => {
    const response = await userService.getNotFoundUser();

    expect(response.status()).toBe(404);
  });

  test('Should create user with dynamic data', async () => {
    const response = await userService.createUser(apiData.validUser);
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.name).toBe(apiData.validUser.name);
    expect(body.job).toBe(apiData.validUser.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });

  test('Should update user', async () => {
    const response = await userService.updateUser(2, apiData.updatedUser);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.name).toBe(apiData.updatedUser.name);
    expect(body.job).toBe(apiData.updatedUser.job);
    expect(body).toHaveProperty('updatedAt');
  });

  test('Should delete user', async () => {
    const response = await userService.deleteUser(2);

    expect(response.status()).toBe(204);
  });
});