import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { CreateOrderPayload, CreateOrderResponse, OrderDetail, UserDto } from './models';

const USERS: UserDto[] = [
  { id: 'u1', fullName: 'Ana García', role: 'admin', active: true },
  { id: 'u2', fullName: 'Bruno Pérez', role: 'developer', active: true },
  { id: 'u3', fullName: 'Carla Ruiz', role: 'designer', active: false },
  { id: 'u4', fullName: 'David López', role: 'qa', active: true },
  { id: 'u5', fullName: 'Elena Martín', role: 'developer', active: false },
  { id: 'u6', fullName: 'Fernando Torres', role: 'admin', active: true }
];

const ORDERS = new Map<string, OrderDetail>();
let orderCounter = 1;
let usersRequestCounter = 0;

function jsonResponse<T>(body: T, latency = 500) {
  return of(new HttpResponse<T>({ status: 200, body })).pipe(delay(latency));
}

function parseUrl(urlWithParams: string): URL {
  return new URL(urlWithParams, 'http://localhost');
}

export const mockApiInterceptor: HttpInterceptorFn = (request, next) => {
  const url = parseUrl(request.urlWithParams);

  if (url.pathname === '/api/users' && request.method === 'GET') {
    usersRequestCounter++;
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';

    const filteredUsers = search
      ? USERS.filter(user =>
          user.fullName.toLowerCase().includes(search) ||
          user.role.toLowerCase().includes(search)
        )
      : USERS;

    return jsonResponse({
      requestNumber: usersRequestCounter,
      users: filteredUsers
    });
  }

  if (url.pathname === '/api/orders' && request.method === 'POST') {
    const payload = request.body as CreateOrderPayload;
    const id = `order-${orderCounter++}`;

    ORDERS.set(id, {
      id,
      productId: payload.productId,
      quantity: payload.quantity,
      total: payload.quantity * 49.99,
      status: 'pending'
    });

    const response: CreateOrderResponse = { id };
    return jsonResponse(response, 600);
  }

  if (url.pathname.startsWith('/api/orders/') && request.method === 'GET') {
    const id = url.pathname.split('/').at(-1) ?? '';
    const order = ORDERS.get(id);

    if (order) {
      return jsonResponse(order, 600);
    }

    return jsonResponse({
      id,
      productId: 'unknown',
      quantity: 0,
      total: 0,
      status: 'cancelled'
    } satisfies OrderDetail, 600);
  }

  return next(request);
};
