import './App.css';
import {useEffect, useState} from 'react';

import { useStoreState } from 'easy-peasy';

import Home from './Pages/Home/Home';
import UserFormPage from './Pages/Home/UserForm/UserFormPage';

import LoadingComponent from './Components/LoadingComponents/LoadingComponent';

function App() {
  const [token,setToken] = useState(window.localStorage.getItem('token'));

  const { user } = useStoreState(state => state.userStore);

  // get token
  useEffect(() => {
    if(token){
      // get User Data
      console.log('got token')
    };
  }, [token]);

  return (
    <div className="App">
      {
        token
          ?
            user ? <Home />: <LoadingComponent />
          : 
            <UserFormPage />
      }
      
    </div>
  );
}

export default App;
