import ActionButton from 'components/buttons/action-button/ActionButton';
import { loginAction } from 'data/api';
import styles from './LoginOverlay.module.scss';
import useOverlayStore from 'store/overlayStore';
import { useState } from 'react';
import useUserStorage from 'store/userStore';

const Login = () => {
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);
  const setJwt = useUserStorage((state) => state.setJwt);

  const [error, setError] = useState<string>();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginAction({ login, password });

      setJwt({ jwt: data.jwt });

      closeOverlay();
    } catch (e: any) {

      console.log('Err', e);
      setError(e.message);
    }
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
      <ActionButton name="Login" additionalStyles={styles.saveButton} />
    </form>
  );
};

export default Login;
