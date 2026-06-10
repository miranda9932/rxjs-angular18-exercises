import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, startWith } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UserService } from '../../core/user.service';
import { UserListComponent } from '../../shared/user-list.component';

@Component({
  selector: 'app-exercise-08-filter',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, UserListComponent],
  templateUrl: './exercise-08-filter.component.html',
  styleUrl: './exercise-08-filter.component.scss'
})
export class Exercise08FilterComponent {
  private readonly userService = inject(UserService);

  readonly searchControl = new FormControl('', { nonNullable: true });

  readonly users$ = this.userService.getUsersCached();

  readonly filteredUsers$ = combineLatest([
    this.users$,
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(300),
      distinctUntilChanged()
    )
  ]).pipe(
    map(([users, term]) => {
      const normalizedTerm = term.trim().toLowerCase();

      if (!normalizedTerm) {
        return users;
      }

      return users.filter(user =>
        user.name.toLowerCase().includes(normalizedTerm) ||
        user.role.toLowerCase().includes(normalizedTerm)
      );
    })
  );
}
