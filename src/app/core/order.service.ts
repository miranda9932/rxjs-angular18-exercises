import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CreateOrderPayload, CreateOrderResponse, OrderDetail } from './models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);

  createOrderAndGetDetail(payload: CreateOrderPayload): Observable<OrderDetail> {
    return this.http.post<CreateOrderResponse>('/api/orders', payload).pipe(
      tap(response => console.log(response.id)),
      switchMap(response =>
        this.http.get<OrderDetail>(`/api/orders/${response.id}`)
      ),
      tap(orderDetail => console.log(orderDetail)),
      catchError(error => {
        console.error('Ha fallado la creación o consulta del pedido', error);
        return throwError(() => error);
      })
    );
  }
}
