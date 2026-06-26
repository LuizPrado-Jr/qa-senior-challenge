import { APIRequestContext, APIResponse } from '@playwright/test';

export class APIClient {
  constructor(
    protected request: APIRequestContext,
    protected baseUrl: string
  ) {}

  protected getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  async post(endpoint: string, payload: object): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      data: payload
    });
  }

  async put(endpoint: string, payload: object): Promise<APIResponse> {
    return this.request.put(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      data: payload
    });
  }

  async patch(endpoint: string, payload: object): Promise<APIResponse> {
    return this.request.patch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      data: payload
    });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders()
    });
  }
}