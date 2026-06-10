import { Component } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-exercise-02-subjects',
  standalone: true,
  templateUrl: './exercise-02-subjects.component.html',
  styleUrl: './exercise-02-subjects.component.scss'
})
export class Exercise02SubjectsComponent {
  logs: string[] = [];

  private subjectCounter = 1;
  private behaviorCounter = 1;
  private replayCounter = 1;

  private readonly eventSubject = new Subject<string>(); // Lo usaria para clicks, eventos, comunicaciones simples entre partes... 
  private readonly statusSubject = new BehaviorSubject<string>('miranda for president'); // Estado actual, usuario seleccionado, filtros actuales...
  private readonly messageSubject = new ReplaySubject<string>(3); //Ultimos logs, ultimas notificaciones... 

  emitSubject(): void {
    this.eventSubject.next(`evento ${this.subjectCounter++}`);
  }

  subscribeSubject(): void {
    const subscriberId = crypto.randomUUID().slice(0, 4);

    this.eventSubject.next(`Test value before subject`)

    this.eventSubject.subscribe(value => {
      this.addLog(`[Subject][subscriber ${subscriberId}] ${value}`);
    });

     this.eventSubject.subscribe(value => {
      this.addLog(`new subscriber to this value ${value}`);
    });

    

    this.eventSubject.next(`Test value after subject`)

    this.addLog(`[Subject] Nuevo subscriber ${subscriberId}. No recibe eventos pasados.`);
  }

  nextStatus(): void {
    this.statusSubject.next(`estado ${this.behaviorCounter++}`);
  }

  subscribeBehaviorSubject(): void {
    const subscriberId = crypto.randomUUID().slice(0, 4);

    this.statusSubject.subscribe(value => {
      this.addLog(`[BehaviorSubject][subscriber ${subscriberId}] ${value}`);
    });

    this.statusSubject.subscribe(value => {
      this.addLog(`Second subscriber${value}`);
    });

    this.addLog(`[BehaviorSubject] Nuevo subscriber ${subscriberId}. Recibe el último estado inmediatamente.`);
  }

  emitReplaySubject(): void {
    this.messageSubject.next(`mensaje ${this.replayCounter++}`)
    this.addLog(`Message sended`);
  }

  subscribeReplaySubject(): void {
    const subscriberId = crypto.randomUUID().slice(0, 4);

    this.messageSubject.subscribe(value => {
      this.addLog(`[ReplaySubject][subscriber ${subscriberId}] ${value}`);
    });
    
    this.messageSubject.subscribe(value => {
      this.addLog(`[ReplaySubject][subscriber ${subscriberId}] ${value}`);
    });


    this.addLog(`[ReplaySubject] Nuevo subscriber ${subscriberId}. Recibe los últimos 3 mensajes.`);
  }

  clearLogs(): void {
    this.logs = [];
  }

  private addLog(message: string): void {
    this.logs = [...this.logs, message];
  }
}
