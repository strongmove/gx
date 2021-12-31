import React from 'react';
import { LoginContext, LoginStore } from './login-store';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

export const useLogin = () => {
  return React.useContext(LoginContext);
};

const isExpired = (token) => {};

class SessionManager {
  constructor() {}
  save() {}
  load() {}
}

class SeesionManagerLocalStorage {
  _name = '__session';
  constructor(name: string) {
    this._name = name;
  }

  save(val: string) {
    localStorage.setItem(this._name, val);
  }

  load() {
    return localStorage.getItem(this._name);
  }
}

const Login: React.FC = (props) => {
  const [store] = React.useState(new LoginStore());
  React.useEffect(() => {
    console.log(store.localUser);
  }, [store]);
  return (
    <LoginContext.Provider value={store}>
      {props.children}
    </LoginContext.Provider>
  );
};
export default Login;
