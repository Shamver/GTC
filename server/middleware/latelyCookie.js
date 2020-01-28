const maxSize = 6;

module.exports.get = (cookie) => {
  if (cookie) {
    return cookie.split('I');
  }

  return [];
}

module.exports.set = (cookie, id) => {
  if (cookie) {
    const datas = cookie.split('I');

    let returnData = '';

    const count = datas.length < 6 ? datas.length + 1 : maxSize;

    for (let i = 0; i < count; i += 1) {
      if (i === 0) {
        returnData += id;
      } else if (datas[i - 1] !== id) {
        returnData += `I${datas[i - 1]}`;
      }
    }

    return returnData;
  }

  return id;
};
