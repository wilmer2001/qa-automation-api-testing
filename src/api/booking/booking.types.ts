export interface BookingRequest {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

export interface BookingResponse {
  bookingid: number;
  booking: BookingRequest;
}

export interface BookingDetails {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
