import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { LoadState, User, UserDto } from './models';

interface UsersApiResponse {
  requestNumber: number;
  users: UserDto[];
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  private usersCache$?: Observable<User[]>;

  private readonly lastRequestNumberSubject = new BehaviorSubject<number>(0);
  readonly lastRequestNumber$ = this.lastRequestNumberSubject.asObservable();

  private readonly reloadUsersSubject = new Subject<void>();

  readonly usersTriggered$: Observable<User[]> = this.reloadUsersSubject.pipe(
    startWith(void 0),
    switchMap(() => this.getUsers()),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly usersState$: Observable<LoadState<User[]>> = this.reloadUsersSubject.pipe(
    startWith(void 0),
    switchMap(() =>
      this.getUsers().pipe(
        map(users => ({ loading: false, data: users, error: null })),
        startWith({ loading: true, data: [], error: null }),
        catchError(error => of({ loading: false, data: [], error }))
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getUsers(): Observable<User[]> {
    return this.http.get<UsersApiResponse>('/api/users').pipe(
      tap(response => this.lastRequestNumberSubject.next(response.requestNumber)),
      tap(response => console.log(`Request HTTP launched, ${response.requestNumber}`)),
      map(response => response.users.map(dto => this.mapUser(dto))),
      catchError(error => this.handleError(error))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    const encodedTerm = encodeURIComponent(term);

    return this.http.get<UsersApiResponse>(`/api/users?search=${encodedTerm}`).pipe(
      tap(response => this.lastRequestNumberSubject.next(response.requestNumber)),
      map(response => response.users.map(dto => this.mapUser(dto))),
      catchError(error => this.handleError(error))
    );
  }

  getUsersCached(): Observable<User[]> {
    if (!this.usersCache$) {
      this.usersCache$ = this.getUsers().pipe(
        shareReplay({ bufferSize: 1, refCount: false }),
        catchError(error => {
          this.usersCache$ = undefined;
          return throwError(() => error);
        })
      );
    }

    return this.usersCache$;
  }

  clearUsersCache(): void {
    this.usersCache$ = undefined;
  }

  reloadUsers(): void {
    this.reloadUsersSubject.next();
  }

  private mapUser(dto: UserDto): User {
    return {
      id: dto.id,
      name: dto.fullName,
      role: dto.role,
      active: dto.active
    };
  }

  private handleError(error: HttpErrorResponse) {
    console.error('UserService error', error);
    return throwError(() => error);
  }
}
