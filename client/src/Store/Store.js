import { createStore } from 'easy-peasy';
import userStore from './UserStore';

const store = createStore({
  userStore
});

export default store;