const filter = (v) => {
  const returnData = v.replace(/<p>/gi, '').replace(/<\/p>/gi, '').replace(/&nbsp;/gi, '');

  return returnData.length > 14 ? `${returnData}...` : returnData;
};

module.exports = filter;
