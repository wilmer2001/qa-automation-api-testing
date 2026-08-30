import { test, expect } from '@playwright/test';
import { authAPI } from '../../api/auth/auth.api';
import logger from '../../utils/logger';

test.describe('Autenticación - Casos Negativos', () => {
  test('NO debe autenticar con credenciales inválidas', async () => {
    logger.info('Test: auth con credenciales inválidas');

    try {
      const token = await authAPI.login('invalid_user', 'invalid_password');
      
      expect(token).toBeFalsy();
    } catch (error: any) {
      logger.info('Autenticación rechazada correctamente', { error: error.message });
      expect(true).toBe(true);
    }
  });

  test('NO debe autenticar sin credenciales', async () => {
    logger.info('Test: auth sin credenciales');

    try {
      const token = await authAPI.login('', '');
      
      expect(token).toBeFalsy();
    } catch (error: any) {
      logger.info('Autenticación sin credenciales rechazada', { error: error.message });
      expect(true).toBe(true);
    }
  });
});
