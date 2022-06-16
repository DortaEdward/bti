import { useState } from 'react';
import './styles.scss';

import LoginForm from '../../../Components/LoginForm/LoginForm';
import SignUpForm from '../../../Components/SignUpForm/SignUpForm';

import { useStoreState } from 'easy-peasy';

function UserFormPage() {
  const [toggleForm, setToggleForm] = useState(true);
  const {error, loading} = useStoreState((state) => state.userStore);

  return (
    <div className='user-form'>
      {
        toggleForm
          ? <LoginForm
              toggleForm={toggleForm}
              setToggleForm={setToggleForm}
              error={error}
              loading={loading} />
          : <SignUpForm
              toggleForm={toggleForm}
              setToggleForm={setToggleForm}
              error={error}
              loading={loading} />
      }
    </div>
  )
}

export default UserFormPage