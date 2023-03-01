export const SERVER_URL = 'http://16.170.48.235:1337';
export const THEME_ENDPOINT = '/volgodd-dictionary-themes-fis';
export const WORD_ENDPOINT = '/volgodd-dictionary-words-fis';

export const ROUTES = {
  MAIN_PAGE: '/',
  WORDS: '/words',
  ADD_WORD_PAGE: '/add-word',
  ADD_THEME_PAGE: '/ad-theme',
  LEARN_MODE: '/learn-mode'
};

export const LEARN_MODES = {
  FLASH_CARDS: 'flash-cards'
};

export const OVERLAY_TYPES = {
  ADD_WORD: 'addWord',
  ADD_THEME: 'addTheme',
  SEARCH: 'search',
  EDIT_WORD: 'editWord',
  EDIT_THEME: 'editTheme',
  MENU: 'menu',
  LOGIN: 'login',
  EDIT_THEME: 'editTheme',
  LEARN_MODE: 'learnMode'
};

export const DEFAULT_OVERLAY_STATE = { type: undefined, metadata: undefined };

export const LOCAL_STORAGE_JWT_KEY = 'authKey';
