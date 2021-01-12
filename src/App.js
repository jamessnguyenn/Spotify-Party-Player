import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Queue from "./Components/Queue/Queue";
function App() {
  return (
   <Router>
     <Switch>
       <Route exact path="/">
         <Login/>
       </Route>
       <Route path="/queue">
         <Queue/>
       </Route>
     </Switch>
   </Router>
  );
}

export default App;
