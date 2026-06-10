import { Component } from '@angular/core';
import { from, interval, of } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-01-basics',
  standalone: true,
  templateUrl: './exercise-01-basics.component.html',
  styleUrl: './exercise-01-basics.component.scss'
})
export class Exercise01BasicsComponent {
  logs: string[] = [];

  runOfExample(): void {
    of(1, 2, 3, 4, 5).pipe(
      tap(value => this.addLog(`En el tap, antes del filter llega ${value}`)),
      filter(value => value >= 2),
      tap(value => this.addLog(`See number before the map ${value}` )),
      map(value => value * 100),
      tap(value => this.addLog(`En el tap despues del map sale ${value}`))
    ).subscribe(value => {
      this.addLog(`[subscribe] resultado final: ${value}`);
    });
  }

  runFromExample(): void {
    from(['Angular', 'RxJS', 'TypeScript']).pipe(
      map(word => word.toUpperCase())
    ).subscribe(word => {
      this.addLog(`[from] ${word}`);
    });
  }

  runIntervalExample(): void {
    interval(500).pipe(
      take(5),
      map(value => `Tick ${value}`)
    ).subscribe(value => {
      this.addLog(`[interval] ${value}`);
    });
  }

  clearLogs(): void {
    this.logs = [];
  }

  private addLog(message: string): void {
    this.logs = [...this.logs, message];
  }
}
