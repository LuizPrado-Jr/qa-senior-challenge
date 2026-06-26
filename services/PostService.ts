import { APIRequestContext } from '@playwright/test';
import { APIClient } from './base/APIClient';

export class PostService extends APIClient {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async getPostById(id: number) {
    return this.get(`/posts/${id}`);
  }

  async getPostComments(id: number) {
    return this.get(`/posts/${id}/comments`);
  }

  async createPost(payload: object) {
    return this.post('/posts', payload);
  }

  async updatePost(id: number, payload: object) {
    return this.put(`/posts/${id}`, payload);
  }

  async patchPost(id: number, payload: object) {
    return this.patch(`/posts/${id}`, payload);
  }

  async deletePost(id: number) {
    return this.delete(`/posts/${id}`);
  }

  async getInvalidPost() {
    return this.get('/posts/999999');
  }
}