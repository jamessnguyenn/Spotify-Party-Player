import axios from 'axios';
import cheerio from 'cheerio';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AutoCompleteText from './AutoCompleteText';

import "./Queue.css";
function Queue() {

  var getRandomHit = () => {
    const url = "https://www.billboard.com/charts/billboard-200";
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


  return (
    <div className="queue-page">
      <div className="queue-container">
        <div className="title-container">
          <h1>Welcome to the Queue!</h1>
          <label className="listener-text">0 people listening to new music with you</label>
        </div>
        <div className="information-container">
         
          <div className="list-container">
            <label className="queue-title">Your Queue</label>
            <nav>
              
            </nav>
          </div>
          <div className="form-container">
            <AutoCompleteText/>
            <input className="add-button" type="button" value="Share with the world" />
            <input className ="random-button" type="button" value="Queue a random song" />
          </div>
        </div>
      </div>

    </div>
  );

}

export default Queue;

