import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, exhaustMap, Subject } from 'rxjs';
import { OrderDetail } from '../../core/models';
import { OrderService } from '../../core/order.service';

@Component({
  selector: 'app-exercise-07-chained-http',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './exercise-07-chained-http.component.html',
  styleUrl: './exercise-07-chained-http.component.scss'
})
export class Exercise07ChainedHttpComponent {
  private readonly orderService = inject(OrderService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly saveSubject = new Subject<void>();

  readonly productIdControl = new FormControl('keyboard', { nonNullable: true });
  readonly quantityControl = new FormControl(1, { nonNullable: true });

  lastOrder: OrderDetail | null = null;

  constructor() {
    this.saveSubject.pipe(
      exhaustMap(() => this.orderService.createOrderAndGetDetail({
        productId: this.productIdControl.value,
        quantity: this.quantityControl.value
      })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(orderDetail => {
      this.lastOrder = orderDetail;
    });

  }

  save(): void {
    this.saveSubject.next();
  }
}
