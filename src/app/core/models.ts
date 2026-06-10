export interface UserDto {
  id: string;
  fullName: string;
  role: 'admin' | 'developer' | 'designer' | 'qa';
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'developer' | 'designer' | 'qa';
  active: boolean;
}

export interface CreateOrderPayload {
  productId: string;
  quantity: number;
}

export interface CreateOrderResponse {
  id: string;
}

export interface OrderDetail {
  id: string;
  productId: string;
  quantity: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
}

export interface LoadState<T> {
  loading: boolean;
  data: T;
  error: unknown | null;
}
