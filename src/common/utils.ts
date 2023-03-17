/* eslint-disable no-restricted-globals */

import type { DataId, JWTType } from 'types/data-types';

import jwtDecode from 'jwt-decode';

export const copyFromClipboard = async () => {
  try {
    const clipboardContent = await navigator.clipboard.readText();

    return clipboardContent;
  } catch (error) {
    console.log('Clipboard error');
  }
};

type CallbackFunction = (value: string) => unknown;

export const copyFromClipboardOld = (callbackFunction: CallbackFunction) => {
  navigator.clipboard
    .readText()
    .then((clipboardValue) => {
      callbackFunction(clipboardValue);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 *
 * @param {*} array array, where we find index
 * @param {*} dataId id to find in array
 * @returns index as number
 */

export const findObjectIndex = <T extends { id: DataId }>(array: T[], dataId: DataId): number => {
  return array.findIndex((x) => x.id === dataId);
};

/**
 *
 * @param {*} array array, where we find index
 * @param {*} dataId id to find in array
 * @returns object/entry from array with current index
 */
export const findObjectById = <T extends { id: DataId }>(array: T[], dataId: DataId): T => {
  const index = array.findIndex((x) => x.id === dataId);

  return array[index];
};

export const stringToSubstring = (rawString: string, word: string, index: number) => {
  if (rawString.includes(word)) {
    return rawString.substring(index);
  }
};

const getDaysInMilliseconds = (numberOfDays: number | undefined = 1): number => {
  return 86400000 * numberOfDays;
};

export const jwtIsExpired = (jwt: JWTType | null): JWTType | null => {
  // console.log('jwtIsExpired() raw JWT', jwt);
  if (jwt) {
    const decodedJWT: Record<string, number> = jwtDecode(jwt);
    const jwtExpiryDate = decodedJWT.exp * 1000;
    // const currentDate = 1679574874 * 1000;
    const currentDate = Date.now();
    console.log(
      { jwtExpiryDate, currentDate },
      'expiry is less than current by',
      jwtExpiryDate - currentDate
    );

    if (jwtExpiryDate - currentDate < 0) {
      return null;
    }

    return jwt;
  }

  return null;
};
