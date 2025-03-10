import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ToDo, ToDoState, User } from '../shared/models/typings';
import {
  catchError,
  delay,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  // Read-only data
  members = toSignal(this.http.get<User[]>(this.userUrl), { initialValue: [] });

  getCurrentMember(id: number): User | undefined {
    return this.members().find((m) => m.id === id);
  }

  private todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  // Signal that holds the state (initial state)
  private state = signal<ToDoState>({
    isLoading: false,
    currentMember: undefined,
    memberToDos: [],
    incompleteOnly: false,
    error: null,
  });

  // Selectors (slices of state)
  isLoading = computed(() => this.state().isLoading);
  currentMember = computed(() => this.state().currentMember);
  toDos = computed(() => this.state().memberToDos);
  incompleteOnly = computed(() => this.state().incompleteOnly);
  errorMessage = computed(() => this.state().error);
  filteredToDos = computed(() => {
    if (this.incompleteOnly()) {
      return this.toDos().filter((t) => t.completed === false);
    } else {
      return this.toDos();
    }
  });

  // Use a subject to react to changes that need an async operation
  private selectedIdSubject = new Subject<number>();

  // Reducers
  // Define how actions should update state
  constructor() {
    this.selectedIdSubject
      .pipe(
        // Set the loading indicator
        tap(() => this.setLoadingIndicator(true)),
        // Set the current member
        tap((id) => this.setCurrentMember(id)),
        // Get the related todos
        switchMap((id) => this.getToDos(id)),
        // To better see the loading message
        delay(1000),
        // Ensure the observables are finalized when this service is destroyed
        takeUntilDestroyed()
      )
      .subscribe((todos) => this.setMemberToDos(todos));
  }

  private setLoadingIndicator(isLoading: boolean) {
    this.state.update((state) => ({
      ...state,
      isLoading: isLoading,
    }));
  }

  private setCurrentMember(id: number) {
    const member = this.getCurrentMember(id);
    this.state.update((state) => ({
      ...state,
      currentMember: member,
      memberToDos: [],
    }));
  }

  private getToDos(id: number): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.todoUrl}?userId=${id}`).pipe(
      // Cut the length of the long strings
      map((data) =>
        data.map((t) =>
          t.title.length > 20 ? { ...t, title: t.title.substring(0, 20) } : t
        )
      ),
      catchError((err) => this.setError(err))
    );
  }

  private setMemberToDos(todos: ToDo[]): void {
    this.state.update((state) => ({
      ...state,
      memberToDos: todos,
      isLoading: false,
    }));
  }

  private setError(err: HttpErrorResponse): Observable<ToDo[]> {
    const errorMessage = setErrorMessage(err);
    this.state.update((state) => ({
      ...state,
      error: errorMessage,
    }));
    return of([]);
  }

  filterToDos(filter: boolean) {
    this.state.update((state) => ({
      ...state,
      incompleteOnly: filter,
    }));
  }

  getToDosForMember(memberId: number) {
    this.selectedIdSubject.next(memberId);
  }

  changeStatus(task: ToDo, status: boolean) {
    // Mark the task as completed
    const updatedTasks = this.toDos().map((t) =>
      t.id === task.id ? { ...t, completed: status } : t
    );
    this.state.update((state) => ({
      ...state,
      memberToDos: updatedTasks,
    }));
  }
}

// This should be somewhere reusable
export function setErrorMessage(err: HttpErrorResponse): string {
  let errorMessage: string;
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Backend returned code ${err.status}: ${err.message}`;
  }
  console.error(err);
  return errorMessage;
}
