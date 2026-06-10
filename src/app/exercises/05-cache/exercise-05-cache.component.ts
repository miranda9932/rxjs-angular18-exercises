import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../core/user.service';
import { UserListComponent } from '../../shared/user-list.component';

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

  resetCachedObservable(): void {
    this.cachedUsers$ = this.userService.getUsersCached();
  }

  clearServiceCache(): void {
    this.userService.clearUsersCache();
    this.cachedUsers$ = this.userService.getUsersCached();
  }
}
