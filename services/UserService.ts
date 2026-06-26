import { APIRequestContext } from '@playwright/test';

export class UserService {
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

  async getUserById(id: number) {
    return this.request.get(`${this.baseUrl}/users/${id}`, {
      headers: this.headers()
    });
  }

  async createUser(payload: object) {
    return this.request.post(`${this.baseUrl}/users`, {
      headers: this.headers(),
      data: payload
    });
  }

  async updateUser(id: number, payload: object) {
    return this.request.put(`${this.baseUrl}/users/${id}`, {
      headers: this.headers(),
      data: payload
    });
  }

  async deleteUser(id: number) {
    return this.request.delete(`${this.baseUrl}/users/${id}`, {
      headers: this.headers()
    });
  }

  async getNotFoundUser() {
    return this.request.get(`${this.baseUrl}/users/999`, {
      headers: this.headers()
    });
  }
}