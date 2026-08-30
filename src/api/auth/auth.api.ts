import { baseRequest } from '../base/base-request';
import { AuthPayload, AuthResponse } from '../booking/booking.types';
import envConfig from '../../config/env.config';
import logger from '../../utils/logger';

export class AuthAPI {
  // ruta (Base URL va en baseRequest)
  private baseUrl = '/auth'; 

  async login(username?: string, password?: string): Promise<string> {
    const maxRetries = 2;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const payload: AuthPayload = {
          // Usa las credenciales del .env
          username: username || envConfig.AUTH_USERNAME,
          password: password || envConfig.AUTH_PASSWORD
        };

        // Realiza la solicitud POST a la API con el payload
        const response = await baseRequest.post<AuthResponse>(
          this.baseUrl,
          payload
        );

        logger.info('Authentication successful');
        return response.data.token; // Retorna el token de la respuesta
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          const delay = 500;
          logger.warn(`Auth attempt ${attempt} failed, retrying in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    logger.error('Authentication failed after 2 attempts', lastError);
    throw lastError; // Lanza error despues de 2 intentos
  }
}

export const authAPI = new AuthAPI();
