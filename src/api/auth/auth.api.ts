import { baseRequest } from '../base/base-request';
import { AuthPayload, AuthResponse } from '../booking/booking.types';
import envConfig from '../../config/env.config';
import logger from '../../utils/logger';

export class AuthAPI {
  private baseUrl = '/auth';

  async login(username?: string, password?: string): Promise<string> {
    const maxRetries = 4;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const payload: AuthPayload = {
          username: username || envConfig.AUTH_USERNAME,
          password: password || envConfig.AUTH_PASSWORD
        };

        const response = await baseRequest.post<AuthResponse>(
          this.baseUrl,
          payload
        );

        logger.info('Authentication successful');
        return response.data.token;
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          const delay = 1500;
          logger.warn(`Auth attempt ${attempt} failed, retrying in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    logger.error('Authentication failed after 4 attempts', lastError);
    throw lastError;
  }
}

export const authAPI = new AuthAPI();
