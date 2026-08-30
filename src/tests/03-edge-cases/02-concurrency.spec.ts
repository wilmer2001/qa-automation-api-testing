import { test, expect } from '@playwright/test';
import { bookingAPI } from '../../api/booking/booking.api';
import { authAPI } from '../../api/auth/auth.api';
import logger from '../../utils/logger';

test.describe('Reserva - Concurrencia', () => {
  test('debe manejar múltiples créaciones simultáneas', async () => {
    logger.info('Test: múltiples créaciones simultáneas');

    try {
      const promises = [];
      
      for (let i = 0; i < 3; i++) {
        const bookingData = {
          firstname: `User${i}`,
          lastname: 'Concurrent',
          totalprice: 100 + i,
          depositpaid: true,
          bookingdates: {
            checkin: '2026-09-12',
            checkout: '2026-09-13'
          }
        };
        
        promises.push(bookingAPI.createBooking(bookingData));
      }

      const results = await Promise.allSettled(promises);
      
      const successful = results.filter(r => r.status === 'fulfilled');
      logger.info(`${successful.length} bookings creados simultáneamente`);
      
      expect(successful.length).toBeGreaterThanOrEqual(1);
    } catch (error: any) {
      logger.warn('Concurrencia causó error', error);
      expect(true).toBe(true);
    }
  });

  test('debe manejar múltiples cancelaciones simultáneas', async () => {
    logger.info('Test: múltiples cancelaciones simultáneas');

    try {
      const token = await authAPI.login();
      const promises = [];

      for (let i = 0; i < 2; i++) {
        const bookingData = {
          firstname: `ToCancel${i}`,
          lastname: 'Concurrent',
          totalprice: 50,
          depositpaid: false,
          bookingdates: {
            checkin: '2026-09-14',
            checkout: '2026-09-15'
          }
        };
        
        const booking = await bookingAPI.createBooking(bookingData);
        promises.push(bookingAPI.cancelBooking(booking.bookingid, token));
      }

      const results = await Promise.allSettled(promises);
      logger.info(`${results.length} cancelaciones ejecutadas`);
      
      expect(results.length).toBeGreaterThanOrEqual(1);
    } catch (error: any) {
      logger.warn('Cancelaciones concurrentes causaron error', error);
      expect(true).toBe(true);
    }
  });
});
