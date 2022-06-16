import { thunk, action } from 'easy-peasy';
import axios from 'axios';

const userStore = {
  user:null,
  loading:false,
  error:null,

  setUser: ((state,user) => {
    state.user =  user;
  }),
  setLoading: ((state,user) => {
    state.user =  user;
  }),
  setError: ((state,user) => {
    state.user =  user;
  }),

};


export default userStore;