/* eslint-disable no-restricted-globals */

import jwtDecode from 'jwt-decode';

export const copyFromClipboard = async () => {
  try {
    const clipboardContent = await navigator.clipboard.readText();

    return clipboardContent;
  } catch (error) {
    console.log(error.message);
  }
};

export const copyFromClipboardOld = (callbackMurMur) => {
  navigator.clipboard
    .readText()
    .then((clipboardValue) => {
      callbackMurMur(clipboardValue);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const deleteLocalDataFromArray = (dataArray, dataId) => {
  const wordIndex = dataArray.findIndex((x) => x.id === dataId);

  const modifiedDataArray = [...dataArray];

  const alertMessage = 'Are your sure you want to delete item?';

  if (confirm(alertMessage) === true) {
    modifiedDataArray.splice(wordIndex, 1);
  } else return;

  console.log(modifiedDataArray, modifiedDataArray.length);
};

export const modifyLocalData = (dataArray, dataId) => {
  const wordIndex = dataArray.findIndex((x) => x.id === dataId);

  const modifiedDataArray = [...dataArray];

  let alertMessage = 'Are your sure you want to delete item?';

  if (confirm(alertMessage) === true) {
    modifiedDataArray.splice(wordIndex, 1);
  } else return;

  console.log(modifiedDataArray, modifiedDataArray.length);
};

export const findObjectIndex = (array, dataId) => {
  return array.findIndex((x) => x.id === dataId);
};

export const stringToSubstring = (rawString, word, index) => {
  if (rawString.includes(word)) {
    return rawString.substring(index);
  }
};

export const findEntriesInArray = (array, themeId) => {
  if (array.includes(array.find((e) => e.id === array.themeId))) return array.themeId;
};

const getDaysInMilliseconds = (numberOfDays = 1) => {
  return 86400000 * numberOfDays;
};

export const jwtIsExpired = (jwt) => {
  // console.log('jwtIsExpired() raw JWT', jwt);
  if (jwt) {
    const decodedJWT = jwtDecode(jwt);
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
