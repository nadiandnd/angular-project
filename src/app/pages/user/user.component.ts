import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToDo } from '../../shared/models/typings';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  name = 'Angular';

  // Services
  userService = inject(UserService);

  // Signals
  users = this.userService.members;
  isLoading = this.userService.isLoading;
  currentMember = this.userService.currentMember;
  todosForMember = this.userService.filteredToDos;
  errorMessage = this.userService.errorMessage;

  // Actions
  onFilter(ele: EventTarget | null) {
    this.userService.filterToDos((ele as HTMLInputElement).checked);
  }

  onSelected(ele: EventTarget | null) {
    this.userService.getToDosForMember(
      Number((ele as HTMLSelectElement).value)
    );
  }

  onChangeStatus(task: ToDo, ele: EventTarget | null) {
    this.userService.changeStatus(task, (ele as HTMLInputElement).checked);
  }
}
