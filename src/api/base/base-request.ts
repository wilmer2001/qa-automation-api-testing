import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import envConfig from '../../config/env.config';
import logger from '../../utils/logger';

// clase de encapsulamiento donde contiene toda la logica del HTTP
export class BaseRequest {
  private client: AxiosInstance;

  //Constructor donde se crea el cliente de azios con su configuracion base
  constructor(baseURL: string = envConfig.API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: envConfig.API_TIMEOUT,
      headers: { 'Content-Type': 'application/json' }
    });

    // interceptor de Request (Esto se ejecuta antes de Enviar)
    this.client.interceptors.request.use(
      (config) => {
        logger.info(`[${config.method?.toUpperCase()}] ${config.url}`); // Log de cada Request
        return config;
      },
      (error) => {
        // Esta fraccion de codigo es si se llega a presentar un error en la construccion del Request
        logger.error('[REQUEST ERROR]', error);
        return Promise.reject(error);
      }
    );

    // Interceptor de Response (Esto se ejecuta Despues de recibir la respuesta)
    this.client.interceptors.response.use(
      (response) => {
        logger.info(`[${response.status}] ${response.config.url}`);
        return response;
      },
      (error) => {
        // En esta parte si hay algun error de response (418, 401 etc)
        logger.error('[RESPONSE ERROR]', { status: error.response?.status });
        return Promise.reject(error);
      }
    );
  }

  // metodos HTTP Genericos

  async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config);
  }
}

export const baseRequest = new BaseRequest();