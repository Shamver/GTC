const filter = (v) => v.replace(/(<([^>]+)>)/ig, '');

module.exports = filter;
