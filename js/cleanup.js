const fs = require('fs-extra');

const config = {
  outputFileRoot: './pdf/',
  outputFileRootPNG: './png/',
};

module.exports = {
  cleanup: () => {
    Promise.all([fs.emptyDir(config.outputFileRoot), fs.emptyDir(config.outputFileRootPNG)])
      .then(() => {
        process.exit(0);
      })
      .catch(() => {
        process.exit(1);
      });
  },
};

if (require.main === module) {
  module.exports.cleanup();
}
