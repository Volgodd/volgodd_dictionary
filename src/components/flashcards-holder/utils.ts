import type { Word } from "types/data-types";
let previousWordIndex: number | undefined = undefined;

export const chooseRandomWord = (wordListArr: Word[]) => {
  const randomWordIndex = Math.abs(Math.round(Math.random() * (wordListArr.length - 1)));

  if (randomWordIndex !== previousWordIndex && randomWordIndex >= 0) {
    previousWordIndex = randomWordIndex;
    // console.log('previousWordIndex === 1', previousWordIndex);
    return wordListArr[previousWordIndex];
  }

  if (previousWordIndex && previousWordIndex + 1 < wordListArr.length - 1) {
    previousWordIndex = previousWordIndex + 1;
    // console.log('previousWordIndex === 2', previousWordIndex);
    return wordListArr[previousWordIndex];
  }

  if (previousWordIndex && previousWordIndex - 1 > 0) {
    previousWordIndex = previousWordIndex - 1;
    // console.log('previousWordIndex === 3', previousWordIndex);
    return wordListArr[previousWordIndex];
  }


  // console.log('previousWordIndex === 4', previousWordIndex);
  return wordListArr[0];
};

export const splitedString = (string: string | undefined) => {
  return string?.split(/\s+|,\s/g).join('')
}