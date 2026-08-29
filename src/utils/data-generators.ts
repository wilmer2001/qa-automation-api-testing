import { faker } from '@faker-js/faker';
import { BookingRequest } from '../api/booking/booking.types';

export class DataGenerator {
  static generateValidBooking(daysFromNow: number = 5): BookingRequest {
    const checkin = new Date();
    checkin.setDate(checkin.getDate() + daysFromNow);

    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + 1);

    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 50, max: 500 }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: checkin.toISOString().split('T')[0],
        checkout: checkout.toISOString().split('T')[0]
      },
      additionalneeds: faker.word.words(3)
    };
  }

  static generateInvalidBooking(): Partial<BookingRequest> {
    return {
      firstname: '',
      totalprice: -50,
      depositpaid: undefined
    };
  }

  static generateBookingWithPastDate(): BookingRequest {
    const checkin = new Date();
    checkin.setDate(checkin.getDate() - 5);

    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + 1);

    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: checkin.toISOString().split('T')[0],
        checkout: checkout.toISOString().split('T')[0]
      }
    };
  }
}
