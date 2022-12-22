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
