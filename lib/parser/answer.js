const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getData = util.getData

module.exports = {
    parseAnswerVoters
}

function parseAnswerVoters(htmls) {
    return util.map(htmls, html => {
        var $ = cheerio.load(html)
        var hashEle = $('.zm-rich-follow-btn')
        var linkEle = $('.zm-item-link-avatar')
        var link = getAttr(linkEle, 'href')
        var avatarEle = $('.zm-item-img-avatar')

        return {
            name: getAttr(linkEle, 'title'),
            uname: link.substring('/people/'.length),
            link: urls.full(link),
            hash: getData(hashEle, 'id'),
            avatar: getAttr(avatarEle, 'src')
        }
    })
}