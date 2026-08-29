import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import envConfig from '../../config/env.config';
import logger from '../../utils/logger';

export class BaseRequest {
  private client: AxiosInstance;

  constructor(baseURL: string = envConfig.API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: envConfig.API_TIMEOUT,
      headers: { 'Content-Type': 'application/json' }
    });

    this.client.interceptors.request.use(
      (config) => {
        logger.info(`[${config.method?.toUpperCase()}] ${config.url}`);
        return config;
      },
      (error) => {
        logger.error('[REQUEST ERROR]', error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        logger.info(`[${response.status}] ${response.config.url}`);
        return response;
      },
      (error) => {
        logger.error('[RESPONSE ERROR]', { status: error.response?.status });
        return Promise.reject(error);
      }
    );
  }

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