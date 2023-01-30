/* eslint-disable no-restricted-globals */
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

export const  stringToSubstring = (rawString, word, index) => {
  if (rawString.includes(word)) { 
   return rawString.substring(index) 
 }
 } 
