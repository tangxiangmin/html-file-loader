// const loaderUtils = require("loader-utils");

const replaceUtil = require('./replace')

module.exports = function (source) {
    this.cacheable();

    const callback = this.async();

    let content = replaceUtil.replace(source)

    callback(null, `module.exports = \`${content}\``);
}
