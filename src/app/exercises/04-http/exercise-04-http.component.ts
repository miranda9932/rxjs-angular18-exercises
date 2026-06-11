import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, filter, map, of } from 'rxjs';
import { UserService } from '../../core/user.service';
import { UserListComponent } from '../../shared/user-list.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-exercise-04-http',
  standalone: true,
  imports: [AsyncPipe, UserListComponent],
  templateUrl: './exercise-04-http.component.html',
  styleUrl: './exercise-04-http.component.scss'
})
export class Exercise04HttpComponent {
  private readonly userService = inject(UserService);
  requestLog = '';

  readonly users$ = this.userService.getUsers().pipe(
    map(users => users.filter(user => user.active == false)),
    tap(() => this.requestLog= 'order confirmed'),
    catchError(() => of([]))
  );
}
