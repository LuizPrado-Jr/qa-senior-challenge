import { test, expect } from '@playwright/test';
import { PostService } from '../../services/PostService';
import apiData from '../../data/apiData.json';
import { env } from '../../utils/env';

test.describe('API - Posts', () => {
  let postService: PostService;

  test.beforeEach(async ({ request }) => {
    postService = new PostService(request, env.apiBaseUrl);
  });

  test('Should return post with status 200', async () => {
    const response = await postService.getPostById(1);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
  });

  test('Should return 404 when post does not exist', async () => {
    const response = await postService.getInvalidPost();

    expect(response.status()).toBe(404);
  });

  test('Should create post with dynamic data', async () => {
    const payload = {
      ...apiData.post,
      title: `${apiData.post.title} - ${Date.now()}`
    };

    const response = await postService.createPost(payload);
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
    expect(body).toHaveProperty('id');
  });

  test('Should update post', async () => {
    const response = await postService.updatePost(1, apiData.updatedPost);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.title).toBe(apiData.updatedPost.title);
    expect(body.body).toBe(apiData.updatedPost.body);
    expect(body.userId).toBe(apiData.updatedPost.userId);
    expect(body).toHaveProperty('id', 1);
  });

  test('Should partially update post', async () => {
    const response = await postService.patchPost(1, apiData.patchedPost);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.title).toBe(apiData.patchedPost.title);
    expect(body).toHaveProperty('id', 1);
  });

  test('Should delete post', async () => {
    const response = await postService.deletePost(1);

    expect(response.status()).toBe(200);
  });

  test('Should return comments from a post', async () => {
    const response = await postService.getPostComments(1);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('postId', 1);
    expect(body[0]).toHaveProperty('email');
    expect(body[0]).toHaveProperty('body');
  });
});