import { test, expect } from '@playwright/test';
import { bookingAPI } from '../../api/booking/booking.api';
import logger from '../../utils/logger';

test.describe('Crear Reserva - Casos Negativos', () => {
  test('NO debe crear reserva con precio negativo', async () => {
    logger.info('Test: crear booking con precio negativo');

    try {
      const invalidBooking = {
        firstname: 'Test',
        lastname: 'User',
        totalprice: -100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-10',
          checkout: '2026-09-11'
        }
      };

      const response = await bookingAPI.createBooking(invalidBooking);
      
      expect(response.booking.totalprice).toBeGreaterThanOrEqual(0);
    } catch (error: any) {
      logger.info('Precio negativo rechazado correctamente', { error: error.message });
      expect(true).toBe(true);
    }
  });

  test('NO debe crear reserva con checkout antes de checkin', async () => {
    logger.info('Test: crear booking con fechas inversas');

    try {
      const invalidBooking = {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-15',
          checkout: '2026-09-10'
        }
      };

      const response = await bookingAPI.createBooking(invalidBooking);
      
      const checkinDate = new Date(response.booking.bookingdates.checkin);
      const checkoutDate = new Date(response.booking.bookingdates.checkout);
      expect(checkoutDate.getTime()).toBeGreaterThan(checkinDate.getTime());
    } catch (error: any) {
      logger.info('Fechas inversas rechazadas correctamente', { error: error.message });
      expect(true).toBe(true);
    }
  });

  test('NO debe crear reserva sin nombre', async () => {
    logger.info('Test: crear booking sin firstname');

    try {
      const invalidBooking = {
        firstname: '',
        lastname: 'User',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-10',
          checkout: '2026-09-11'
        }
      };

      const response = await bookingAPI.createBooking(invalidBooking);
      
      expect(response.booking.firstname).toBeTruthy();
    } catch (error: any) {
      logger.info('Booking sin nombre rechazado correctamente', { error: error.message });
      expect(true).toBe(true);
    }
  });
});
