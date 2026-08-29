import { test as base } from '@playwright/test';
import { authAPI } from '../api/auth/auth.api';
import { bookingAPI } from '../api/booking/booking.api';
import logger from '../utils/logger';

export type APIFixtures = {
  authToken: string;
  testBookingId: number;
};

export const test = base.extend<APIFixtures>({
  authToken: async ({}, use) => {
    logger.info('Setting up authentication');
    const token = await authAPI.login();
    await use(token);
  },

  testBookingId: async ({ authToken }, use) => {
    logger.info('Setting up test booking');
    const booking = await bookingAPI.createBooking({
      firstname: 'Test',
      lastname: 'Patient',
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-09-01',
        checkout: '2024-09-02'
      }
    });

    await use(booking.bookingid);

    logger.info('Cleaning up test booking');
    try {
      await bookingAPI.cancelBooking(booking.bookingid, authToken);
    } catch (error) {
      logger.warn('Failed to cleanup booking', error);
    }
  }
});

export { expect } from '@playwright/test';
