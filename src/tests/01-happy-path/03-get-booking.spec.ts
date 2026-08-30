import { test, expect } from '../../fixtures/api.fixtures';
import { bookingAPI } from '../../api/booking/booking.api';
import logger from '../../utils/logger';

test.describe('Consultar reserva - Happy Path', () => {
  test('debe consultar una reserva existente', async ({ testBookingId }) => {
    logger.info('Test: consultar reserva existente', { bookingId: testBookingId });

    const booking = await bookingAPI.getBooking(testBookingId);

    expect(booking).toBeDefined();
    expect(booking.firstname).toBeTruthy();
    expect(booking.lastname).toBeTruthy();

    logger.info('Reserva consultada exitosamente', { firstname: booking.firstname });
  });
});
