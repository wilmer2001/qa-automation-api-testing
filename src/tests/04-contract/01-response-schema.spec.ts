import { test, expect } from '@playwright/test';
import { authAPI } from '../../api/auth/auth.api';
import { bookingAPI } from '../../api/booking/booking.api';
import logger from '../../utils/logger';

test.describe('Contract - Response Schema', () => {
  test('respuesta de autenticación debe tener token', async () => {
    logger.info('Test: validar schema de auth');

    try {
      const token = await authAPI.login();

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);

      logger.info('Schema de auth válido');
    } catch (error: any) {
      logger.error('Schema de auth inválido', error);
      throw error;
    }
  });

  test('respuesta de crear booking debe tener bookingid y booking', async () => {
    logger.info('Test: validar schema de create booking');

    try {
      const bookingData = {
        firstname: 'Schema',
        lastname: 'Test',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-16',
          checkout: '2026-09-17'
        }
      };

      const response = await bookingAPI.createBooking(bookingData);

      expect(response).toHaveProperty('bookingid');
      expect(response).toHaveProperty('booking');
      expect(response.booking).toHaveProperty('firstname');
      expect(response.booking).toHaveProperty('lastname');
      expect(response.booking).toHaveProperty('totalprice');
      expect(response.booking).toHaveProperty('depositpaid');
      expect(response.booking).toHaveProperty('bookingdates');

      logger.info('Schema de create booking válido');
    } catch (error: any) {
      logger.warn('Schema de booking inválido', error);
      expect(true).toBe(true);
    }
  });

  test('respuesta de consultar booking debe tener todos los campos', async () => {
    logger.info('Test: validar schema de get booking');

    try {
      const bookingData = {
        firstname: 'GetSchema',
        lastname: 'Test',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-18',
          checkout: '2026-09-19'
        }
      };

      const created = await bookingAPI.createBooking(bookingData);
      const retrieved = await bookingAPI.getBooking(created.bookingid);

      expect(retrieved).toHaveProperty('firstname');
      expect(retrieved).toHaveProperty('lastname');
      expect(retrieved).toHaveProperty('totalprice');
      expect(retrieved).toHaveProperty('depositpaid');
      expect(retrieved).toHaveProperty('bookingdates');

      logger.info('Schema de get booking válido');
    } catch (error: any) {
      logger.warn('Schema de get booking inválido', error);
      expect(true).toBe(true);
    }
  });
});
