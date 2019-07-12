// Our scraping tools

var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
  request("https://www.travelandleisure.com/travel-news", function(
    err,
    res,
    body
  ) {
    var $ = cheerio.load(body);

    var articles = [];

    $(".type-article").each(function(i, element) {
      var head = $(this)
        .children(".media-heading")
        .text()
        .trim();
      var sum = $(this)
        .children(".article-info-extended")
        .text()
        .trim();
      if (head && sum) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dateToAdd = {
          headline: headNeat,
          summary: sumNeat
        };
        articles.push(dataToAdd);
      }
    });
    cb(articles);
  });
};
module.exports = scrape;
