// todo 开放配置接口
const tagsConfig = {
    img: ["src", "data-src"],
    link: ["href"],
    audio: ["src"],
    script: ["src"],
    video: ["src"]
}

// 替换原始html中所有的 ` 字符
function replaceAllSemicolon(content) {
    return content.replace(/`/g, "\\`")
}

// 使用正则解析img、audio、script、link等标签的文件引用
function replaceTag(content) {
    // todo 增加其他标签的解析方式
    const re = /<(img|link|audio|script).*?\/?>/g
    return content.replace(re, (tag) => {
        let re = /<(.*?)\s/
        let tagName = (re.exec(tag) || [])[1]
        if (tagName) {
            let attrs = tagsConfig[tagName]
            Array.isArray(attrs) && attrs.forEach(attr => {
                tag = tag.replace(new RegExp(`${attr}=(['"])(.*?)\\1`), function (match, $1, source) {
                    // 不管$1捕获的是单引号还是双引号，都将属性替换为"双引号包围  
                    return `${attr}="\` + require('${source}') + \`"`
                })
            })
        }
        return tag
    })
}

module.exports = {
    replace(content) {
        return replaceTag(replaceAllSemicolon(content))
    },
    replaceAllSemicolon,
    replaceTag
}
