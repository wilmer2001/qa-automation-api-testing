import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve('.env.local') });
dotenv.config({ path: path.resolve('.env') });

const envConfig = {
  API_BASE_URL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '30000'),
  AUTH_USERNAME: process.env.AUTH_USERNAME || '',
  AUTH_PASSWORD: process.env.AUTH_PASSWORD || '',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  MAX_RETRIES: parseInt(process.env.MAX_RETRIES || '3'),
  RETRY_DELAY: parseInt(process.env.RETRY_DELAY || '1000')
};

const requiredVars = ['API_BASE_URL', 'AUTH_USERNAME', 'AUTH_PASSWORD'];
const missing = requiredVars.filter(v => !envConfig[v as keyof typeof envConfig]);

if (missing.length > 0) {
  throw new Error(`Variables faltantes: ${missing.join(', ')}`);
}

export default envConfig;