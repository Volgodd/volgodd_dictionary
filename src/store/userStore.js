import {
  clearLocalStorage,
  getJWTFromLocalStorage,
  setJWTFromLocalStorage
} from 'common/local-storage';

import { create } from 'zustand';
import { jwtIsExpired } from 'common/utils';

// TRY to get jwt from local storage and validate it at once
// If valid - return JWT. If not - return null value and request to log in

const validatedJwt = jwtIsExpired(getJWTFromLocalStorage());

const defaultUserStore = { jwt: validatedJwt }; // null if does not exist

const useUserStore = create((set) => ({
  ...defaultUserStore,
  setJwt: ({ jwt }) => {
    setJWTFromLocalStorage(jwt);
    return set({ jwt });
  },
  clearJwt: () => {
    clearLocalStorage();
    return set({ jwt: null });
  }
}));

export default useUserStore;
