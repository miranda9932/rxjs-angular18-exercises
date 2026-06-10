import { Component, Input } from '@angular/core';
import { User } from '../core/models';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input({ required: true }) users: User[] = [];
}
