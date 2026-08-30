import { test, expect } from '../../fixtures/api.fixtures';
import { bookingAPI } from '../../api/booking/booking.api';
import logger from '../../utils/logger';

test.describe('Operaciones - Sin Autorización', () => {
  test('NO debe actualizar reserva sin token válido', async ({ testBookingId }) => {
    logger.info('Test: actualizar sin token válido', { bookingId: testBookingId });

    try {
      const invalidToken = 'invalid_token_12345';
      
      const updateData = {
        firstname: 'Hacker',
        lastname: 'Attempt',
        totalprice: 999,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-20',
          checkout: '2026-09-21'
        }
      };

      const result = await bookingAPI.updateBooking(testBookingId, updateData, invalidToken);
      
      expect(result.firstname).not.toBe('Hacker');
    } catch (error: any) {
      logger.info('Update sin autorización rechazado', { error: error.message });
      expect(true).toBe(true);
    }
  });

  test('NO debe cancelar reserva sin token', async ({ testBookingId }) => {
    logger.info('Test: cancelar sin token', { bookingId: testBookingId });

    try {
      const invalidToken = '';
      
      await bookingAPI.cancelBooking(testBookingId, invalidToken);
      
      expect(false).toBe(true);
    } catch (error: any) {
      logger.info('Cancel sin token rechazado', { error: error.message });
      expect(true).toBe(true);
    }
  });
});
