module.exports.capitalizeFirstLetter = function (string) {
  let strArr = string.split(" ");
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
  }
  return strArr.join(" ");
};

module.exports.getMonth = function () {
  const createdTime = Math.round(new Date().getTime());
  var date = new Date(createdTime);
  return date.getMonth() + 1;
};

module.exports.getYear = function () {
  const createdTime = Math.round(new Date().getTime());
  var date = new Date(createdTime);
  return (year = date.getFullYear());
};
