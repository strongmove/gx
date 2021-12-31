import React from 'react';
import { makeAutoObservable, toJS } from 'mobx';

export const ANONYMOUS = 'ANONYMOUS';

export interface LoginData {
  username: string;
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface LocalUser {
  username: string;
  token: TokenData;
}

export interface TokenData {
  access: string;
  refresh: string;
}

export const DefaultLocalUser: LocalUser = {
  username: ANONYMOUS,
  token: {
    access: '',
    refresh: '',
  },
};

export const DefaultLoginData: LoginData = {
  username: ANONYMOUS,
  // username: 'supj',
};

export const LoginContext = React.createContext<LoginData>(DefaultLoginData);

export class LoginStore {
  username = DefaultLoginData.username;
  _token: TokenData = { access: '', refresh: '' };

  constructor() {
    makeAutoObservable(this);
  }

  get localUser() {
    return JSON.parse(localStorage.getItem('localUser')) || DefaultLocalUser;
  }

  set localUser(val) {
    localStorage.setItem('localUser', JSON.stringify(val));
  }

  get token() {
    return this._token;
  }

  set token(data: TokenData) {
    this._token = data;
  }

  login = async (data: LoginProps) => {
    const url = `http://192.168.2.12:8888/api/token`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const token = await resp.json();
    console.log(parseJwt(token.access), parseJwt(token.refresh));
    this.token = token;
  };
}

function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
