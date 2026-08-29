import { baseRequest } from '../base/base-request';
import { AuthPayload, AuthResponse } from '../booking/booking.types';
import envConfig from '../../config/env.config';
import logger from '../../utils/logger';

export class AuthAPI {
  private baseUrl = '/auth';

  async login(username?: string, password?: string): Promise<string> {
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
      logger.error('Authentication failed', error);
      throw error;
    }
  }
}

export const authAPI = new AuthAPI();
