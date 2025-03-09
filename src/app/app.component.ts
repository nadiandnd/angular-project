import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  path = '';
  constructor(
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.changePageTitle();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  changePageTitle() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => {
          this.path = event.url;
          return this.getTitle();
        }),
        tap((ttl: string) => {
          this.title.setTitle(ttl);
        })
      )
      .subscribe();
  }

  getTitle(): string {
    if (!!this.activatedRoute.snapshot.data['title']) {
      return this.activatedRoute.snapshot.data['title'];
    }
    let child = this.activatedRoute?.firstChild;
    if (!!child) {
      while (child.firstChild) {
        child = child?.firstChild;
      }
    }
    if (child?.snapshot.data['title']) {
      return child?.snapshot.data['title'];
    }

    return 'Practice Project';
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
