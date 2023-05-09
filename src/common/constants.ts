export const SERVER_URL = 'http://16.170.48.235:1337';
export const THEME_ENDPOINT = '/volgodd-dictionary-themes-fis';
export const WORD_ENDPOINT = '/volgodd-dictionary-words-fis';

export enum ROUTE {
  MAIN_PAGE = '/',
  WORDS = '/words',
  ADD_WORD_PAGE = '/add-word',
  ADD_THEME_PAGE = '/ad-theme',
  LEARN_MODE = '/learn-mode'
}

export enum LEARN_PAGE {
  FLASH_CARDS = 'flash-cards',
  WRITING_MODE = 'writing-mode'
}

export enum OVERLAY_TYPE {
  ADD_WORD = 'addWord',
  ADD_THEME = 'addTheme',
  SEARCH = 'search',
  EDIT_WORD = 'editWord',
  EDIT_THEME = 'editTheme',
  MENU = 'menu',
  LOGIN = 'login',
  LEARN_MODE = 'learnMode'
}

export const LOCAL_STORAGE_JWT_KEY = 'authKey';
