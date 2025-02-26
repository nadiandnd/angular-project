import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAccessTokenResp } from '../shared/models/typings';
import { catchError, finalize, shareReplay, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSecretKey = 'Bearer Token';

  constructor(public router: Router, public httpClient: HttpClient) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.authSecretKey);
    return !!token;
  }

  login(payload: { username: string; password: string }) {
    return this.httpClient
      .post<IAccessTokenResp>(`/api/authentication`, payload)
      .pipe(
        tap((resp) => {
          this.handleLoginSuccess(resp);
        }),
        switchMap((resp) => {
          if (resp.portalUser.credentialsExpired) {
            return this.router.navigate(['/change-password']);
          } else {
            return this.verifyPolicyVersion();
          }
        }),
        finalize(() => {}),
        shareReplay()
      );
  }

  private handleLoginSuccess(response: IAccessTokenResp) {
    localStorage.setItem(this.authSecretKey, response.access_token);
  }

  private verifyPolicyVersion() {
    return this.httpClient
      .get<boolean>(`/api/policy/validate-version`)
      .pipe(
        switchMap((isAccepted) =>
          isAccepted
            ? this.router.navigate(['/dashboard'])
            : this.router.navigate(['/term-and-condition'])
        )
      );
  }

  logout() {
    this.httpClient.post(`/api/logout`, {}).pipe(
      tap(() => localStorage.removeItem(this.authSecretKey)),
      catchError((error) => (window.location.href = error.url)),
      finalize(() => this.router.navigate(['/login']))
    );
  }
}
