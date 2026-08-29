import { baseRequest } from '../base/base-request';
import { BookingRequest, BookingResponse, BookingDetails } from './booking.types';
import logger from '../../utils/logger';

export class BookingAPI {
  private baseUrl = '/booking';

  async createBooking(booking: BookingRequest): Promise<BookingResponse> {
    try {
      const response = await baseRequest.post<BookingResponse>(
        this.baseUrl,
        booking
      );
      logger.info('Booking created successfully', { bookingId: response.data.bookingid });
      return response.data;
    } catch (error) {
      logger.error('Failed to create booking', error);
      throw error;
    }
  }

  async getBooking(bookingId: number): Promise<BookingDetails> {
    try {
      const response = await baseRequest.get<BookingDetails>(
        `${this.baseUrl}/${bookingId}`
      );
      return response.data;
    } catch (error) {
      logger.error(`Failed to get booking ${bookingId}`, error);
      throw error;
    }
  }

  async updateBooking(
    bookingId: number,
    booking: BookingRequest,
    token: string
  ): Promise<BookingDetails> {
    try {
      const response = await baseRequest.put<BookingDetails>(
        `${this.baseUrl}/${bookingId}`,
        booking,
        {
          headers: { Cookie: `token=${token}` }
        }
      );
      logger.info('Booking updated successfully', { bookingId });
      return response.data;
    } catch (error) {
      logger.error(`Failed to update booking ${bookingId}`, error);
      throw error;
    }
  }

  async cancelBooking(bookingId: number, token: string): Promise<void> {
    try {
      await baseRequest.delete(
        `${this.baseUrl}/${bookingId}`,
        {
          headers: { Cookie: `token=${token}` }
        }
      );
      logger.info('Booking cancelled successfully', { bookingId });
    } catch (error) {
      logger.error(`Failed to cancel booking ${bookingId}`, error);
      throw error;
    }
  }

  async getBookingIds(params?: { firstname?: string; lastname?: string }): Promise<number[]> {
    try {
      const response = await baseRequest.get<{ bookingids: number[] }>(
        this.baseUrl,
        { params }
      );
      return response.data.bookingids;
    } catch (error) {
      logger.error('Failed to get booking IDs', error);
      throw error;
    }
  }
}

export const bookingAPI = new BookingAPI();
