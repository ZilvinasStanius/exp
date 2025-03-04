import { useState } from 'react';
import '../styles/SignIn.css';
import useLogin from '../customHooks/useLogin';
import useRegister from '../customHooks/useRegister';

export default function SignIn() {
  const [isRegister, setIsRegister] = useState(false);
  const { onLogin, message } = useLogin();
  const { onRegister, msg } = useRegister();

  return (
    <div>
      <div class="formContainer">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        {isRegister ? (
          <form onSubmit={onRegister}>
            <input
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              type="text"
              name="email"
              placeholder="email"
            />
            <input
              type="text"
              name="password"
              placeholder="password"
            />
            <button type="submit">Register</button>
            <span>
              <b>{msg}</b>
            </span>
          </form>
        ) : (
          <form onSubmit={onLogin}>
            <input
              type="text"
              name="email"
              placeholder="email"
              required
            />
            <input
              type="text"
              name="password"
              placeholder="password"
              required
            />
            <button type="submit">Log in</button>
            <div class="spanDiv">
              <span>
                <b>{message}</b>
              </span>
            </div>
          </form>
        )}
        <p>
          {isRegister ? 'Already have an account?' : 'Dont have an account?'}{' '}
        </p>
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </button>
      </div>
    </div>
  );
}
