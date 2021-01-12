const axios = require("axios");
const cheerio = require("cheerio");

function getRandomHit() {
    url = "https://www.billboard.com/charts/billboard-200";
    var rndSong = null;
    axios
      .get(url)
      .then((response) => {
        //handling the success
        const html = response.data;
  
        //loading response data into a Cheerio instance
        const $ = cheerio.load(html);
  
        //selecting the data
  
        //Songs names
        var songs = [];
        $("ol[class='chart-list__elements']")
          .find(
            "span[class='chart-element__information__song text--truncate color--primary']"
          )
          .each(function (i, element) {
            songs.push(element.children[0].data);
          });
  
        //Artists names
        var artists = [];
        $("ol[class='chart-list__elements']")
          .find(
            "span[class='chart-element__information__artist text--truncate color--secondary']"
          )
          .each(function (i, element) {
            artists.push(element.children[0].data);
          });
  
        //get the artist and song randomly
        var pos = Math.floor(Math.random() * 201);
        rndSong = { artist: artists[pos], song: songs[pos] };
  
        //outputting the scraped data
        console.log(rndSong);
      })
      //handling error
      .catch((error) => {
        console.log(error);
      });
  
      return rndSong;
  }