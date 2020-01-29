const maxSize = 6;

module.exports.get = (cookie) => {
  if (cookie) {
    return cookie.split('I');
  }

  return [];
};

module.exports.set = (cookie, id) => {
  if (cookie) {
    const datas = cookie.split('I');

    let returnData = '';

    const count = datas.length < 6 ? datas.length + 1 : maxSize;

    let calc = -1;

    for (let i = 0; i < count; i += 1) {
      if (i === 0) {
        returnData += id;
      } else if (datas[i + calc] === id && count === maxSize) {
        returnData += `I${datas[i]}`;
        calc = 0;
      } else if (datas[i + calc] !== id) {
        returnData += `I${datas[i + calc]}`;
      }
    }

    return returnData;
  }

  return id;
};

module.exports.del = (cookie, id) => {
  const datas = cookie.split('I');

  let returnData = '';

  const count = datas.length;

  for (let i = 0; i < count; i += 1) {
    if (datas[i] !== id) {
      if (i !== 0 && returnData !== '') {
        returnData += 'I';
      }
      returnData += datas[i];
    }
  }

  return returnData;
};
