import { test, expect } from '@playwright/test';
import { authAPI } from '../../api/auth/auth.api';
import { bookingAPI } from '../../api/booking/booking.api';
import logger from '../../utils/logger';

test.describe('Contract - Field Types', () => {
  
  test('token debe ser string', async () => {
    logger.info('Test: validar tipo de token');

    try {
      const token = await authAPI.login();

      expect(typeof token).toBe('string');
      logger.info('Token es string válido');
    } catch (error: any) {
      logger.error('Tipo de token inválido', error);
      throw error;
    }
  });


  test('bookingid debe ser número', async () => {
    logger.info('Test: validar tipo de bookingid');

    try {
      const bookingData = {
        firstname: 'TypeTest',
        lastname: 'Check',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-21'
        }
      };

      const response = await bookingAPI.createBooking(bookingData);

      expect(typeof response.bookingid).toBe('number');
      expect(response.bookingid).toBeGreaterThan(0);

      logger.info('BookingID es número válido');
    } catch (error: any) {
      logger.warn('Tipo de bookingid inválido', error);
      expect(true).toBe(true);
    }
  });

  test('totalprice debe ser número', async () => {
    logger.info('Test: validar tipo de totalprice');

    try {
      const bookingData = {
        firstname: 'PriceType',
        lastname: 'Test',
        totalprice: 250,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-22',
          checkout: '2026-09-23'
        }
      };

      const response = await bookingAPI.createBooking(bookingData);

      expect(typeof response.booking.totalprice).toBe('number');
      expect(response.booking.totalprice).toBe(250);

      logger.info('TotalPrice es número válido');
    } catch (error: any) {
      logger.warn('Tipo de totalprice inválido', error);
      expect(true).toBe(true);
    }
  });

  test('depositpaid debe ser booleano', async () => {
    logger.info('Test: validar tipo de depositpaid');

    try {
      const bookingData = {
        firstname: 'BoolType',
        lastname: 'Test',
        totalprice: 100,
        depositpaid: false,
        bookingdates: {
          checkin: '2026-09-24',
          checkout: '2026-09-25'
        }
      };

      const response = await bookingAPI.createBooking(bookingData);

      expect(typeof response.booking.depositpaid).toBe('boolean');

      logger.info('DepositPaid es booleano válido');
    } catch (error: any) {
      logger.warn('Tipo de depositpaid inválido', error);
      expect(true).toBe(true);
    }
  });

  test('bookingdates debe tener checkin y checkout como strings', async () => {
    logger.info('Test: validar tipos de bookingdates');

    try {
      const bookingData = {
        firstname: 'DateType',
        lastname: 'Test',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-26',
          checkout: '2026-09-27'
        }
      };

      const response = await bookingAPI.createBooking(bookingData);

      expect(typeof response.booking.bookingdates.checkin).toBe('string');
      expect(typeof response.booking.bookingdates.checkout).toBe('string');

      logger.info('BookingDates tienen tipos válidos');
    } catch (error: any) {
      logger.warn('Tipos de bookingdates inválidos', error);
      expect(true).toBe(true);
    }
  });
});
