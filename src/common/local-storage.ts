import type { JWTType } from 'types/data-types';
import { LOCAL_STORAGE_JWT_KEY } from 'common/constants';

export const getJWTFromLocalStorage = (): JWTType | null => {
  return localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
};

export const setJWTFromLocalStorage = (jwt: JWTType): void => {
  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, jwt);
};

export const clearLocalStorage = (): void => localStorage.clear();
