// eslint-disable-next-line import/prefer-default-export
export const getMiddleOfElement = (element) => {
  try {
    const { x, y, width, height } = element.getBoundingClientRect();

    return {
      x: Math.floor(x + window.pageXOffset + width / 2),
      y: Math.floor(y + window.pageYOffset + height / 2),
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
