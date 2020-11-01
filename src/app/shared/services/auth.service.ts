import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()

export class AuthService {
  private readonly authUri: string = 'http://interview.agileengine.com/auth';
  private readonly apiKey: string = '23567b218376f79d9415';

  constructor(private httpClient: HttpClient) {
  }

  public getToken(): Observable<void> {
    return this.httpClient.post(this.authUri, {
      apiKey: this.apiKey,
    }).pipe(
      tap((token: any): void => {
        this.storeToken(token.token);
      }),
      map((): void => {
      }),
    );
  }

  public getTokenFromStorage(): string {
    return localStorage.getItem('token');
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
