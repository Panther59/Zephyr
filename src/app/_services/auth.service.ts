import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebToken } from '../_models/webToken';
import { StorageService } from './storage.service';
import { User } from '../_models/user';

@Injectable()
export class AuthService {

    constructor(
        private storageService: StorageService,
        private httpClient: HttpClient) { }

    logout() {
        this.storageService.currentUser = null;
        this.storageService.token = null;
        this.storageService.isSocial = false;
    }

    authenticate(userName: string, password: string): Observable<WebToken> {
        const cred = 'Basic ' + btoa(userName + ':' + password);
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', cred);
        return this.httpClient.get<WebToken>('api/authentication', { headers: headers });
    }

    authenticeSocial(user: User): Observable<WebToken> {
        const headers = new HttpHeaders();
        return this.httpClient.post<WebToken>('api/authentication/social', user);
    }
}
