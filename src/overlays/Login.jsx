import NavButton from 'components/footer/nav-button/NavButton';
import React from 'react';
import { loginAction } from 'data/api';
import styles from './Login.module.scss';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';

const Login = () => {
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);
  const setJwt = useUserStorage((state) => state.setJwt);

  const [error, setError] = useState();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setError();

    try {
      const { data } = await loginAction({ login, password });

      setJwt({ jwt: data.jwt });

      closeOverlay();
    } catch (e) {
      console.log('Err', e);
      setError(e.message);
    }

    // if (!text) {
    //   alert('please fill in foreign language field');
    //   return;
    // }

    // if (!translation) {
    //   alert('please fill in native language field');
    //   return;
    // }

    //здесь будет ф по отправке данных на сервер
  };

  return (
    <form onSubmit={submitHandler} className={styles.loginInterface}>
      <div className={styles.loginInterfaceRow}>
        <input
          type="text"
          placeholder="Login"
          className="inputElement"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
          required
        />
      </div>
      <div className={styles.loginInterfaceRow}>
        <input
          type="password"
          placeholder="Password"
          className="inputElement"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      {error && <div className={styles.loginInterfaceRow_error}>{error}</div>}
      <NavButton name="Login" styles={styles.saveButton} />
    </form>
  );
};

export default Login;
