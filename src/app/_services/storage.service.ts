import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Guid } from 'guid-typescript';

@Injectable()
export class StorageService {

  private readonly currentUserKey = 'currentUser';
  private readonly tokenKey = 'token';
  private readonly themeKey = 'theme';
  private readonly clientKey = 'uuid';
  private readonly isSocialKey = 'isSocial';

  get currentUser(): User {
    return this.getStorageData<User>(this.currentUserKey);
  }

  set currentUser(user: User) {
    this.setStorageData(this.currentUserKey, user);
  }

  get isSocial(): boolean {
    return this.getStorageData<boolean>(this.isSocialKey);
  }

  set isSocial(isboo: boolean) {
    const data = isboo;
    this.setStorageString(this.isSocialKey, data.toString());
  }

  get client(): string {
    let data = this.getStorageString(this.clientKey);
    if (data == null) {
      data = Guid.create().toString();
      this.setStorageString(this.clientKey, data);
    }

    return data;
  }

  set client(client: string) {
    this.setStorageString(this.clientKey, client);
  }

  get theme(): string {
    return this.getStorageString(this.themeKey);
  }

  set theme(theme: string) {
    this.setStorageString(this.themeKey, theme);
  }

  get token(): string {
    return this.getStorageString(this.tokenKey);
  }

  set token(token: string) {
    this.setStorageString(this.tokenKey, token);
  }

  private getStorageData<T>(key: string) {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  private getStorageString(key: string) {
    return localStorage.getItem(key);
  }

  private setStorageData(key: string, data: object) {
    let strData = null;
    if (data != null) {
      strData = JSON.stringify(data);
    }
    this.setStorageString(key, strData);
  }

  private setStorageString(key: string, data: string) {
    if (data == null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, data);
    }
  }

}
