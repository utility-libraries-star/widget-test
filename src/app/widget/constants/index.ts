export { defaultSettings } from './defaultSettings';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const API_URL = IS_DEVELOPMENT
  ? 'http://localhost:3000'
  : 'https://widget-test-teal.vercel.app';
