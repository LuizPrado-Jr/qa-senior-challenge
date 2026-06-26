import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { UserService } from '../../services/UserService';
import userSchema from '../../schemas/user.schema.json';

const baseUrl = process.env.API_BASE_URL as string;
const apiKey = process.env.REQRES_API_KEY as string;

test.describe('API - Contract', () => {
  let userService: UserService;

  test.beforeEach(async ({ request }) => {
    userService = new UserService(request, baseUrl, apiKey);
  });

  test('Should validate user response contract', async () => {
    const response = await userService.getUserById(2);
    const body = await response.json();

    const ajv = new Ajv();
    const validate = ajv.compile(userSchema);
    const isValid = validate(body);

    expect(response.status()).toBe(200);
    expect(isValid, JSON.stringify(validate.errors)).toBeTruthy();
  });
});