import './App.css';
import './components/navigation/navigation.js'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ProviderFavorites} from "./components/providers/favorite-context";
import Navigation from "./components/navigation/navigation";
import Reservations from "./components/reservations/reservations"
import Houses from "./components/houses/houses"
import Details from './components/details/details'
import Favorites from "./components/favorites/favorites";

function App() {
  return <ProviderFavorites><BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/house/:houseId" component={Details}/>
        <Route path="/home" component={Reservations}/>
        <Route path="/search" component={Houses}/>
        <Route path="/favorites" component={Favorites}/>
        <Redirect to={"/home"}/>
      </Switch>
      <Navigation/>
    </div>
  </BrowserRouter>
    </ProviderFavorites>
}

export default App;
