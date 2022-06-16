import { useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import LoadingIcon from "../LoadingIcon/LoadingIcon";

function SignUpForm({toggleForm, setToggleForm}) {
  const email = useRef(null);
  const displayName = useRef(null);
  const password= useRef(null);
  const repeatPassword= useRef(null);
  const userImgUrl= useRef(null);
  const { userSignUp } = useStoreActions(actions => actions.userStore);
  const { loading, error } = useStoreState(state => state.userState);
  const signUp = (e) => {
    e.preventDefault();
    const payload = {
      email:email.current.value,
      displayName:displayName.current.value,
      userImage:userImgUrl.current.value ? userImgUrl.current.value : 'user.png',
      password: password.current.value,
    };
    userSignUp(payload);
  };

  return (
    <div className='user-form-container'>
      <h1>Sign Up</h1>
      {
        error && <div className='error-message'>Review Inputs</div>
      }
      <form onSubmit={signUp}>
        <input
          type="email"
          placeholder='Email'
          required={true}
          ref={email}/>
        <input
          type="text"
          placeholder='Display Name'
          required={true}
          ref={displayName}/>
        <input
          type="password"
          placeholder='Password'
          required={true}
          ref={password}/>
        <input
          type="password"
          placeholder='Repeat Password'
          required={true}
          ref={repeatPassword}/>
        <input
          type="text"
          placeholder='Profile Image'
          ref={userImgUrl}/>

        {
          loading
            ? <LoadingIcon />
            : <button>Sign Up</button>
        }
        
      </form>
      <p>
        Have an account already?
        <span
          onClick={()=>setToggleForm(!toggleForm)}
          className='toggle-form'>
            Log In
        </span>
      </p>
    </div>
  )
}

export default SignUpForm