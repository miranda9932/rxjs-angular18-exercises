import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UserService } from '../../core/user.service';
import { UserListComponent } from '../../shared/user-list.component';

@Component({
  selector: 'app-exercise-04-http',
  standalone: true,
  imports: [AsyncPipe, UserListComponent],
  templateUrl: './exercise-04-http.component.html',
  styleUrl: './exercise-04-http.component.scss'
})
export class Exercise04HttpComponent {
  private readonly userService = inject(UserService);

  readonly users$ = this.userService.getUsers().pipe(
    catchError(() => of([]))
  );
}
