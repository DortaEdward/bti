import { useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

function LoginForm({toggleForm, setToggleForm}) {
  const email = useRef(null);
  const password= useRef(null);
  const { userLogIn } = useStoreActions(actions => actions.userStore)
  const {error, loading} = useStoreState(state => state.userStore);
  const login = async (e) => {
    e.preventDefault();
    const payload = {
      email: email.current.value,
      password: password.current.value
    };
    userLogIn(payload);

  }
  return (
    <div className='user-form-container'>
      <h1>Log In</h1>
      {
        error && <div className='error-message'>Review Inputs</div>
      }
      <form onSubmit={login}>
        <input
          type="email"
          placeholder='Email'
          // required={true}
          ref={email}
          />
        <input
          type="password"
          placeholder='Password'
          // required={true}
          ref={password}
          />
        {
          loading
            ? <LoadingIcon />
            : <button>Log In</button>
        }
      </form>
      <p>
        Don't have an account?
        <span
          onClick={()=>setToggleForm(!toggleForm)}
          className='toggle-form'>
            Sign Up
        </span>
      </p>
    </div>
  )
}

export default LoginForm