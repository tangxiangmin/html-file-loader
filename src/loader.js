const loaderUtils = require("loader-utils");

const replaceUtil = require('./replace')
module.exports = function (source) {
    this.cacheable();
    const callback = this.async();

    let options = loaderUtils.getOptions(this)

    let content = replaceUtil.replace(source, options)

    callback(null, `module.exports = \`${content}\``);
}
