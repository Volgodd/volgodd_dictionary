import { LOCAL_STORAGE_JWT_KEY } from 'common/constants';

export const getJWTFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
};

export const setJWTFromLocalStorage = (jwt) => {
  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, jwt);
};
