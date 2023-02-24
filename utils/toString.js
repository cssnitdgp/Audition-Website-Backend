const toString = (data) => {
  str = "";

  for (let i = 0; i < data.length; i++) {
    str += data[i];
    if (i !== data.length - 1) {
      str += ";";
    }
  }
  return str;
};

module.exports = toString;
