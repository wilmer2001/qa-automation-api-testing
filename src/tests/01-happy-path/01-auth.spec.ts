import { test, expect } from '@playwright/test';
import { authAPI } from '../../api/auth/auth.api';
import logger from '../../utils/logger';

// Agrupa los tests relacionados
test.describe('Autenticación - Happy Path', () => {

  // Caso de prueba 1: Autenticación exitosa (test individual)
  test('debe autenticar correctamente con credenciales válidas', async () => {
    logger.info('Test: autenticación válida');

    const token = await authAPI.login(); // llamamos al Login

    // verificaciones o validaciones pertinentes (asserts)
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    logger.info('Autenticación exitosa', { token: token.substring(0, 20) + '...' });
  });
});
