import { expect } from '@playwright/test';

export class CustomAssertions {
  static assertBookingExists(booking: any) {
    expect(booking).toHaveProperty('bookingid');
    expect(booking).toHaveProperty('booking');
    expect(booking.booking).toHaveProperty('firstname');
    expect(booking.booking).toHaveProperty('totalprice');
  }

  static assertValidBookingDates(booking: any) {
    const { checkin, checkout } = booking.booking.bookingdates;
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    expect(checkoutDate.getTime()).toBeGreaterThan(checkinDate.getTime());
  }

  static assertResponseSchema(response: any, requiredFields: string[]) {
    requiredFields.forEach(field => {
      expect(response).toHaveProperty(field);
    });
  }

  static assertHttpStatus(status: number, expectedStatus: number | number[]) {
    const expectedArray = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];
    expect(expectedArray).toContain(status);
  }
}
