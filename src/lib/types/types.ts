/**
 * Represents the structure of an order.
 */
export interface Order {
  id: number;
  url: string;
  date: string;
  amount: {
    usd: string;
    cad: string;
    fee: string;
    net: string;
  };
  payment: {
    transactionId: string;
    card: {
      number: string;
      type: string;
      expiry: string;
    };
  };
  customer: {
    name: string;
  };
  event: {
    thumbUrl: string;
    name: string;
  };
}

/**
 * Represents the structure of an event.
 */
export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  ticketsSold: number;
  ticketsAvailable: number;
  status: string;
  url: string;
  imgUrl: string;
}

/**
 * Represents the structure of a transaction.
 */
export interface Transaction {
  id: string;
  type: string;
  amount: string;
  date: string;
}

/**
 * Represents a paginated response.
 */
export interface PaginatedResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}