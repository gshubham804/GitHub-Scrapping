const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./issues")
function getReposPageHtml(url,topic){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }
        else{
            getReposLink(html);
        }
    }

    function getReposLink(html){
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
        for(let i=0;i<8;i++){
            let twoAnchors = $(headingsArr[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");
            console.log(link);
            let fullLink = `https://github.com${link}/issues`;
            let repoName = link.split("/").pop();
            getIssuesPageHtml(fullLink,topic,repoName);
        }
    }
}

module.exports = getReposPageHtml;