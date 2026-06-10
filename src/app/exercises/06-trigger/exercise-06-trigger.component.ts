import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../core/user.service';
import { UserListComponent } from '../../shared/user-list.component';

@Component({
  selector: 'app-exercise-06-trigger',
  standalone: true,
  imports: [AsyncPipe, UserListComponent],
  templateUrl: './exercise-06-trigger.component.html',
  styleUrl: './exercise-06-trigger.component.scss'
})
export class Exercise06TriggerComponent {
  private readonly userService = inject(UserService);

  readonly users$ = this.userService.usersTriggered$;
  readonly lastRequestNumber$ = this.userService.lastRequestNumber$;

  reload(): void {
    this.userService.reloadUsers();
  }
}
