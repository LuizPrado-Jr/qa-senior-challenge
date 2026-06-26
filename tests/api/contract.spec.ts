import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { PostService } from '../../services/PostService';
import postSchema from '../../schemas/post.schema.json';
import { env } from '../../utils/env';

test.describe('API - Contract', () => {
  let postService: PostService;

  test.beforeEach(async ({ request }) => {
    postService = new PostService(request, env.apiBaseUrl);
  });

  test('Should validate post response contract', async () => {
    const response = await postService.getPostById(1);
    const body = await response.json();

    const ajv = new Ajv();
    const validate = ajv.compile(postSchema);
    const isValid = validate(body);

    expect(response.status()).toBe(200);
    expect(isValid, JSON.stringify(validate.errors)).toBeTruthy();
  });
});