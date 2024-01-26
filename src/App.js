import {Switch, Route} from 'react-router-dom'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SingleMovieDetails from './components/SingleMovieDetails'
// import CastCrewDetails from './components/CastCrewDetails'
import SearchMovies from './components/SearchMovies'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Popular} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/movie/:id" component={SingleMovieDetails} />
    <Route exact path="/search" component={SearchMovies} />
  </Switch>
)

export default App
