export const generateCode = prefix => {
  const date = new Date();
  const time = `${date.getFullYear().toString().slice(-2)}${('0' + date.getDate()).slice(-2)}${(
    '0' +
    (date.getMonth() + 1)
  ).slice(-2)}`;
  return `${prefix}${time}`;
};

export const generateOrderCode = (total, num) => {
  const postFix = generateZeroString(num);
  return `${postFix}${total + 1}`.slice(num * -1 - 1);
};

const generateZeroString = num => {
  let zeroString = '';
  for (let i = 0; i < num; i++) {
    zeroString += '0';
  }
  return zeroString;
};
