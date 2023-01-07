import { LOCAL_STORAGE_JWT_KEY } from 'common/constants';

export const getLocalJWT = () => {
  return localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
};

export const setLocalJWT = (jwt) => {
  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, jwt);
};
