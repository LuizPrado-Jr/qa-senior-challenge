import { APIRequestContext } from '@playwright/test';
import { APIClient } from './base/APIClient';

export class UserService extends APIClient {
  constructor(
    request: APIRequestContext,
    baseUrl: string,
    apiKey?: string
  ) {
    super(request, baseUrl, apiKey);
  }

  async getUserById(id: number) {
    return this.get(`/users/${id}`);
  }

  async getNotFoundUser() {
    return this.get('/users/999');
  }

  async createUser(payload: object) {
    return this.post('/users', payload);
  }

  async updateUser(id: number, payload: object) {
    return this.put(`/users/${id}`, payload);
  }

  async deleteUser(id: number) {
    return this.delete(`/users/${id}`);
  }
}