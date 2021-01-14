import "./Login.css";


function Login(){
const clientID  = process.env.REACT_APP_CLIENT_ID;
const redirectUri = "https://spotify-queue-party.herokuapp.com/queue";
const scopes =['user-modify-playback-state', 'user-read-private']

const login = ()=>{
   window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
}

return(
<div className = "login-page">
    <div className = "login-container">
        <div className="song-info-contianer">
        </div>
        <div className="login-form" >
        <div className= "login-title-container">
            <h1 className= "login-title">Spotify Party Playlist</h1>
            
        </div>
        <div className= "sub-text-container">
        <label className="sub-text">Listen with people across the World!</label>
        </div>
            <div className="button-container"> 
            <input type="button" className="login-button" value="Sign in with Spotify" onClick = {login}/>
            </div>
        </div>
        
    </div>
   
</div>    
);

}
export default Login;