import { thunk, action } from 'easy-peasy';
import axios from 'axios';

const userStore = {
  user:null,
  loading:false,
  error:null,
  
  // Actions
  setUser: action((state,user) => {
    state.user = user;
  }),
  setLoading: action((state,loading) => {
    state.loading = loading;
  }),
  setError: action((state,error) => {
    state.error = error;
  }),

  userLogIn: thunk(async (actions,payload) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      setTimeout(() => {
        console.log(payload)
      }, 3000);
    } catch (error) {
      actions.setError(true);
    }
    actions.setLoading(false);
  }),

  userSignUp: thunk(async (actions,payload) => {
    console.log(payload);
  }),

  getUser: thunk(async(actions,payload) => {

  }),

};


export default userStore;