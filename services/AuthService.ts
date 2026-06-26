import { APIRequestContext } from '@playwright/test';
import { APIClient } from './base/APIClient';

export class AuthService extends APIClient {
  constructor(
    request: APIRequestContext,
    baseUrl: string,
    apiKey?: string
  ) {
    super(request, baseUrl, apiKey);
  }

  async login(payload: object) {
    return this.post('/login', payload);
  }

  async register(payload: object) {
    return this.post('/register', payload);
  }
}