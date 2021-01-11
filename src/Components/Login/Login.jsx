import "./Login.css";
function Login(){




return(
<div className = "login-page">
    <div className = "login-container">
        <div className="song-info-contianer">
        </div>
        <form className="login-form">
        <div className= "login-title-container">
            <h1 className= "login-title">Spotify Party Playlist</h1>
            
        </div>
        <div className= "sub-text-container">
        <label className="sub-text">Listen with People Across the World!</label>
        </div>
            <div className="button-container">
            <input type="submit" className="login-button" value="Sign with Spotify"/>
            </div>
        </form>
        
    </div>
   
</div>    
);

}
export default Login;