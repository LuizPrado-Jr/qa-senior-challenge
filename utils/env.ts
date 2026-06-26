export const env = {
  apiBaseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
 
  webBaseUrl: process.env.WEB_BASE_URL || 'https://www.saucedemo.com',
  standardUser: process.env.STANDARD_USER || 'standard_user',
  lockedUser: process.env.LOCKED_USER || 'locked_out_user',
  password: process.env.PASSWORD || 'secret_sauce'
};