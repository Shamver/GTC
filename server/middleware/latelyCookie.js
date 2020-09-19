const maxSize = 6;

module.exports.get = (cookie) => {
  if (cookie) {
    return cookie.split('I');
  }

  return [];
};

module.exports.set = (cookie, id) => {
  if (cookie) {
    const dataArr = cookie.split('I');

    if (id === undefined) {
      return cookie || '';
    }

    let returnData = '';

    const count = dataArr.length < 6 ? dataArr.length + 1 : maxSize;

    let calc = -1;

    for (let i = 0; i < count; i += 1) {
      if (i === 0) {
        returnData += id;
      } else if (dataArr[i + calc] === id && count === maxSize) {
        returnData += `I${dataArr[i]}`;
        calc = 0;
      } else if (dataArr[i + calc] !== id) {
        returnData += `I${dataArr[i + calc]}`;
      }
    }

    return returnData;
  }

  return id;
};

module.exports.del = (cookie, id) => {
  const dataArr = cookie.split('I');

  let returnData = '';

  const count = dataArr.length;

  for (let i = 0; i < count; i += 1) {
    if (dataArr[i] !== id) {
      if (i !== 0 && returnData !== '') {
        returnData += 'I';
      }
      returnData += dataArr[i];
    }
  }

  return returnData;
};
