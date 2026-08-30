import { baseRequest } from '../base/base-request';
import { BookingRequest, BookingResponse, BookingDetails } from './booking.types';
import logger from '../../utils/logger';

export class BookingAPI {
  private baseUrl = '/booking';

  // Metodo privado para manejar reintentos (Reutilizable)
  private async retry<T>(
    fn: () => Promise<T>,
    operation: string,
    maxRetries: number = 2
  ): Promise<T> {
    let lastError: any;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn(); // intenta la Operacion
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          const delay = 500;
          logger.warn(`${operation} attempt ${attempt} failed, retrying in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    throw lastError; // lanza un error despues de todos los Intentos
  }

  async createBooking(booking: BookingRequest): Promise<BookingResponse> {
    return this.retry(async () => {
      const response = await baseRequest.post<BookingResponse>(
        this.baseUrl,
        booking
      );
      logger.info('Booking created successfully', { bookingId: response.data.bookingid });
      return response.data;
    }, 'Create booking');
  }
  // obtener reserva por ID con reintentos

  async getBooking(bookingId: number): Promise<BookingDetails> {
    return this.retry(async () => {
      const response = await baseRequest.get<BookingDetails>(
        `${this.baseUrl}/${bookingId}`
      );
      return response.data;
    }, `Get booking ${bookingId}`);
  }
  // actualizar reserva
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
          headers: { Cookie: `token=${token}` } // Autenticacion via cookies
        }
      );
      logger.info('Booking updated successfully', { bookingId });
      return response.data;
    } catch (error) {
      logger.error(`Failed to update booking ${bookingId}`, error);
      throw error;
    }
  }

  //cancelar reserva
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
  // obtencion de lista de reservas con filtros
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
