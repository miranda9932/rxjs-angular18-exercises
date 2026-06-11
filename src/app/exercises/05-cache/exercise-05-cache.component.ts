import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../core/user.service';
import { UserListComponent } from '../../shared/user-list.component';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-exercise-05-cache',
  standalone: true,
  imports: [AsyncPipe, UserListComponent],
  templateUrl: './exercise-05-cache.component.html',
  styleUrl: './exercise-05-cache.component.scss'
})
export class Exercise05CacheComponent {
  private readonly userService = inject(UserService);

  readonly lastRequestNumber$ = this.userService.lastRequestNumber$;
  cachedUsers$ = this.userService.getUsersCached();

  adminObservableList$ = this.userService.getUsersCached();
  activeObservableList$ = this.userService.getUsersCached();

  resetCachedObservable(): void {
    this.cachedUsers$ = this.userService.getUsersCached();
  }
  
   resetCachedObservableAdmin(): void {
    this.adminObservableList$ = this.userService.getUsersCached().pipe(
      map(users => users.filter(user => user.role === 'admin'))
    );
  }

   resetCachedObservableActive(): void {
    this.activeObservableList$ = this.userService.getUsersCached().pipe(
      map(users => users.filter(user => user.active === true))
    );
  }

  clearServiceCache(): void {
    this.userService.clearUsersCache();
    this.cachedUsers$ = this.userService.getUsersCached();
    this.adminObservableList$ = this.userService.getUsersCached();
    this.activeObservableList$ = this.userService.getUsersCached();
  }
}