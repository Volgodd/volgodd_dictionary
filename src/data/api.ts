import type { DataId, JWTType, LoginData, RawTheme, Word } from 'types/data-types';
import { SERVER_URL, THEME_ENDPOINT, WORD_ENDPOINT } from 'common/constants';

import axios from 'axios';

type LoginActionProps = {
  login: string;
  password: string;
};

export const loginAction = ({ login, password }: LoginActionProps): Promise<LoginData> => {
  return axios
    .post(`${SERVER_URL}/auth/local`, {
      identifier: login,
      password: password
    })
    .then((response) => response.data);
};

type RequestHeaders = {
  'Content-Type': 'application/json';
  Authorization: string;
};

const getRequestHeaders = (jwt: JWTType): RequestHeaders => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`
  };
};

const getThemesAction = (jwt: JWTType): Promise<RawTheme[]> => {
  return axios
    .get(`${SERVER_URL}${THEME_ENDPOINT}`, {
      headers: getRequestHeaders(jwt)
    })
    .then((response) => response.data);
};

const getWordsAction = (jwt: JWTType): Promise<Word[]> => {
  return axios
    .get(`${SERVER_URL}${WORD_ENDPOINT}`, {
      headers: getRequestHeaders(jwt)
    })
    .then((response) => response.data);
};

type InitialAppData = {
  wordData: Word[];
  themeData: RawTheme[];
};

export const getData = async (jwt: JWTType): Promise<InitialAppData> => {
  const themeData = await getThemesAction(jwt);
  const wordData = await getWordsAction(jwt);

  return { wordData, themeData };
};

export type NewThemeRequestData = {
  name: string;
};

type AddThemeActionProps = {
  jwt: JWTType;
  data: NewThemeRequestData;
};

export const addThemeAction = ({ jwt, data }: AddThemeActionProps): Promise<RawTheme> => {
  return axios
    .post(`${SERVER_URL}${THEME_ENDPOINT}`, data, {
      headers: getRequestHeaders(jwt)
    })
    .then((response) => response.data);
};

export type NewWordRequestData = {
  foreign: string;
  native: string;
  examples: string;
  themeIdList: DataId[];
};

type AddWordActionProps = {
  jwt: JWTType;
  data: NewWordRequestData;
};

export const addWordAction = ({ jwt, data }: AddWordActionProps): Promise<Word> => {
  return axios
    .post(`${SERVER_URL}${WORD_ENDPOINT}`, data, {
      headers: getRequestHeaders(jwt)
    })
    .then((response) => response.data);
};

type EditWordActionProps = {
  jwt: JWTType;
  data: NewWordRequestData;
  id: DataId;
};

export const editWordAction = ({ jwt, data, id }: EditWordActionProps): Promise<Word> => {
  return axios
    .put(`${SERVER_URL}${WORD_ENDPOINT}/${id}`, data, {
      headers: getRequestHeaders(jwt)
    })
    .then((response) => response.data);
};

type DeleteWordActionProps = {
  jwt: JWTType;
  id: DataId;
};

export const deleteWordAction = ({ jwt, id }: DeleteWordActionProps): Promise<Word> => {
  return axios
    .delete(`${SERVER_URL}${WORD_ENDPOINT}/${id}`, {
      headers: getRequestHeaders(jwt)
    })
    .then((response) => response.data);
};

type EditThemeActionProps = {
  jwt: JWTType;
  data: Record<string, unknown>;
  id: DataId;
};

export const editThemeAction = ({ jwt, data, id }: EditThemeActionProps): Promise<RawTheme> => {
  return axios
    .put(`${SERVER_URL}${THEME_ENDPOINT}/${id}`, data, {
      headers: getRequestHeaders(jwt)
    })
    .then((response) => response.data);
};

type DeleteThemeActionProps = {
  jwt: JWTType;
  id: DataId;
};

export const deleteThemeAction = ({ jwt, id }: DeleteThemeActionProps): Promise<RawTheme> => {
  return axios
    .delete(`${SERVER_URL}${THEME_ENDPOINT}/${id}`, {
      headers: getRequestHeaders(jwt)
    })
    .then((response) => response.data);
};
