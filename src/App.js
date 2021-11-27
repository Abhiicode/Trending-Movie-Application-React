import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Favourite from "./components/Favourite.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Helmet from "react-helmet";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route path="/fav" component={Favourite} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
