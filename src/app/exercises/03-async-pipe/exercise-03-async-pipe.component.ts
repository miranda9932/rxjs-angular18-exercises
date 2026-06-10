import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-03-async-pipe',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './exercise-03-async-pipe.component.html',
  styleUrl: './exercise-03-async-pipe.component.scss'
})
export class Exercise03AsyncPipeComponent {
  private readonly destroyRef = inject(DestroyRef);

  listToDo: string[] = [];

  //When I don`t want to do implement manual subscriptions, in this way subscriptions open and close automatically
  readonly counter$ = interval(1000).pipe(
    map(value => value +10 )
  );

  //When I was to take the control fo the observables 
  startManualSubscription(): void {
    interval(1000).pipe(
      tap(value => {
        this.listToDo = [...this.listToDo, `original value: ${value}`]
      }),
      map(value => `Manual subscribing: ${value + 1}`),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(message => {
      this.listToDo = [...this.listToDo, message];
    });
  }
}
