const convertTens = (x) => {
  if (x < 10) {
    return `0${x}`;
  } else {
    return `${x}`;
  }
};
export default convertTens