//import { fakeThemeData, fakeWordData } from 'data/fake-data';

import { SERVER_URL, THEME_ENDPOINT, WORD_ENDPOINT } from 'common/constants';

import axios from 'axios';
import { countThemeWords } from './utils';

export const loginAction = ({ login, password }) => {
  return axios.post(`${SERVER_URL}/auth/local`, {
    identifier: login,
    password: password
  });
};

const getRequestHeaders = (jwt) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwt}`
  };
};

const getThemesAction = (jwt) => {
  return axios.get(`${SERVER_URL}${THEME_ENDPOINT}`, {
    headers: getRequestHeaders(jwt)
  });
};

const getWordsAction = (jwt) => {
  return axios.get(`${SERVER_URL}${WORD_ENDPOINT}`, {
    headers: getRequestHeaders(jwt)
  });
};

export const getData = async (jwt) => {
  const { data: themeData } = await getThemesAction(jwt);
  const { data: wordData } = await getWordsAction(jwt);

  const processedThemeData = countThemeWords({ wordData, themeData });

  return { wordData, themeData: processedThemeData };
};

export const addThemeAction = (jwt, data) => {
  return axios.post(`${SERVER_URL}${THEME_ENDPOINT}`, data, {
    headers: getRequestHeaders(jwt)
  });
};
