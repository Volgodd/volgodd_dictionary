//import { fakeThemeData, fakeWordData } from 'data/fake-data';

// eslint-disable-line no-alert
/* eslint-disable no-restricted-globals */

import { SERVER_URL, THEME_ENDPOINT, WORD_ENDPOINT } from 'common/constants';

import axios from 'axios';

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

  return { wordData, themeData };
};

export const addThemeAction = (jwt, data) => {
  return axios.post(`${SERVER_URL}${THEME_ENDPOINT}`, data, {
    headers: getRequestHeaders(jwt)
  });
};

export const addWordAction = (jwt, data) => {
  return axios.post(`${SERVER_URL}${WORD_ENDPOINT}`, data, {
    headers: getRequestHeaders(jwt)
  });
};

export const editWordAction = (jwt, data, id) => {
  return axios.put(`${SERVER_URL}${WORD_ENDPOINT}/${id}`, data, {
    headers: getRequestHeaders(jwt)
  });
};

export const deleteWordAction = (jwt, id) => {
  const alertMessage = 'Are your sure you want to delete item?';
  if (confirm (alertMessage) === true) {
    return axios.delete(`${SERVER_URL}${WORD_ENDPOINT}/${id}`, {
      headers: getRequestHeaders(jwt)
    });
  }
};

export const editThemeAction = (jwt, data, id) => {
  return axios.put(`${SERVER_URL}${THEME_ENDPOINT}/${id}`, data, {
    headers: getRequestHeaders(jwt)
  });
};
