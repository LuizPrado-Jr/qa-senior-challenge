import { APIRequestContext } from '@playwright/test';

export class AuthService {
  constructor(
    private request: APIRequestContext,
    private baseUrl: string,
    private apiKey: string
  ) {}

  private headers() {
    return {
      'x-api-key': this.apiKey
    };
  }

  async login(payload: object) {
    return this.request.post(`${this.baseUrl}/login`, {
      headers: this.headers(),
      data: payload
    });
  }

  async register(payload: object) {
    return this.request.post(`${this.baseUrl}/register`, {
      headers: this.headers(),
      data: payload
    });
  }
}