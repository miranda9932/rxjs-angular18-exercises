import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, startWith } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../core/user.service';
import { UserListComponent } from '../../shared/user-list.component';

@Component({
  selector: 'app-exercise-09-mini-challenge',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, UserListComponent],
  templateUrl: './exercise-09-mini-challenge.component.html',
  styleUrl: './exercise-09-mini-challenge.component.scss'
})
export class Exercise09MiniChallengeComponent {
  private readonly userService = inject(UserService);

  private readonly reloadSubject = new BehaviorSubject<void>(void 0);

  readonly lastRequestNumber$ = this.userService.lastRequestNumber$;

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly statusControl = new FormControl<'all' | 'active' | 'inactive'>('all', { nonNullable: true });

  readonly backendUsers$ = combineLatest([
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(300),
      distinctUntilChanged()
    ),
    this.reloadSubject
  ]).pipe(
    switchMap(([term]) => this.userService.searchUsers(term))
  );

  readonly filteredUsers$ = combineLatest([
    this.backendUsers$,
    this.statusControl.valueChanges.pipe(startWith(this.statusControl.value))
  ]).pipe(
    map(([users, status]) => {
      if (status === 'active') {
        return users.filter(user => user.active);
      }

      if (status === 'inactive') {
        return users.filter(user => !user.active);
      }

      return users;
    })
  );

  reload(): void {
    this.reloadSubject.next();
  }
}
