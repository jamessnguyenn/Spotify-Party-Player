import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import queryString from 'query-string';
function AutoCompleteText({textField, updateList, songSelected, songs, clearSongs}){
   
   const node = useRef();

    useEffect(()=>{
        document.addEventListener('mousedown', handleClick, false);
        return () => {
            document.removeEventListener("mousedown", handleClick);
          };
    },[])

    
    const handleClick = e =>{
        if(node.current.contains(e.target)){
            return;
        }
        clearSongs();
        
      }

    return(
        <div ref={node}className="text-field-container">
             <input type="text" value={textField} placeholder="Search for song or enter a uri" className="song-text-field" onChange={updateList}/>
           {songs.length!=0 && <ul>
                {songs.map((item)=> <li onClick={()=>songSelected(item)}>{item.name}</li>)}
            </ul>}
        </div>

    );
}

export default AutoCompleteText;