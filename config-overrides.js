const { addDecoratorsLegacy, override } = require('customize-cra');

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
  ),
};
