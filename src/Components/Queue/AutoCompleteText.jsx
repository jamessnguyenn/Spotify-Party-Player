import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import queryString from 'query-string';
function AutoCompleteText(){
    const node = useRef();
    const values = queryString.parse(window.location.hash);
    const[textField, setTextField] = useState('');
    const [songs, setSongs] = useState([]);

    useEffect(()=>{
        document.addEventListener('mousedown', handleClick, false);
        return () => {
            document.removeEventListener("mousedown", handleClick);
          };
    },[])


    function songSelected(selectedItem){
        setTextField(selectedItem.uri);
        setSongs([]);
    }
    const handleClick = e =>{
        if(node.current.contains(e.target)){
            return;
        }
        setSongs([]);
        
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

    return(
        <div ref={node}className="text-field-container">
             <input type="text" value={textField} placeholder="Search a Song / Enter a URI" className="song-text-field" onChange={updateList}/>
           {songs.length!=0 && <ul>
                {songs.map((item)=> <li onClick={()=>songSelected(item)}>{item.name}</li>)}
            </ul>}
        </div>

    );
}

export default AutoCompleteText;