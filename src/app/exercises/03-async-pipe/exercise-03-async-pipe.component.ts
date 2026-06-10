import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-03-async-pipe',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './exercise-03-async-pipe.component.html',
  styleUrl: './exercise-03-async-pipe.component.scss'
})
export class Exercise03AsyncPipeComponent {
  private readonly destroyRef = inject(DestroyRef);

  logs: string[] = [];

  readonly counter$ = interval(1000).pipe(
    map(value => value + 1)
  );

  startManualSubscription(): void {
    interval(1000).pipe(
      map(value => `Subscribe manual: ${value + 1}`),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(message => {
      this.logs = [...this.logs, message];
    });
  }
}
