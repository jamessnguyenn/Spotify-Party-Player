import axios from 'axios';
import cheerio from 'cheerio';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AutoCompleteText from './AutoCompleteText';

import "./Queue.css";
function Queue() {

  const values = queryString.parse(window.location.hash);
  const [songs, setSongs] = useState([]);
  const [textField, setTextField] = useState('');
 
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
        var topSongs = [];
        $("ol[class='chart-list__elements']")
          .find(
            "span[class='chart-element__information__song text--truncate color--primary']"
          )
          .each(function (i, element) {
            topSongs.push(element.children[0].data);
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
        rndSong = { artist: artists[pos], song: topSongs[pos] };

        //outputting the scraped data
        console.log(rndSong);
      })
      //handling error
      .catch((error) => {
        console.log(error);
      });

    return rndSong;
  }

  const updateList = e =>{
    setTextField(e.target.value);
    const queryURL = queryString.stringifyUrl({url: 'https://api.spotify.com/v1/search', query: {q: e.target.value, type: 'track'}});
    axios.get(queryURL, {
    headers:{
        'Authorization': 'Bearer ' + values.access_token
    }
    })
    .then(res =>{
    const items  = res.data.tracks.items;
    const songList = []
    items.forEach(element=>{
        songList.push({name: element.name+" by " +element.artists[0].name , uri: element.uri})
    });
    setSongs(songList);
    })
    .catch(err=>{
    setSongs([]);
    })
  };
  

  function songSelected(selectedItem){
    setTextField(selectedItem.uri);
    setSongs([]);
  }

 const clearSongs = ()=>{
   setSongs([]);
 }

  return (
    <div className="queue-page">
      <div className="queue-container">
        <div className="title-container">
          <h1>Welcome to the Queue!</h1>
          <label className="listener-text">0 people listening to new music with you</label>
        </div>
         <div className="list-container">
         <label className="queue-title">Queue History</label>
          </div>
        <div className="information-container">
          <div className="form-container">
            <AutoCompleteText textField={textField} updateList={updateList} songSelected={songSelected} songs={songs} clearSongs={clearSongs}/>
            <input className="add-button" type="button" value="Share with the world" />
            <input className ="random-button" type="button" value="Queue a random song" />
          </div>
        </div>
      </div>

    </div>
  );

}

export default Queue;

