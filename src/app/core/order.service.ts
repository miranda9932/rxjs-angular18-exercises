import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateOrderPayload, CreateOrderResponse, OrderDetail } from './models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);

  createOrderAndGetDetail(payload: CreateOrderPayload): Observable<OrderDetail> {
    return this.http.post<CreateOrderResponse>('/api/orders', payload).pipe(
      switchMap(response => this.http.get<OrderDetail>(`/api/orders/${response.id}`))
    );
  }
}
