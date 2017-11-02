
import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import SearchFormComponent from './components/SearchFormComponent';
import ErrorComponent from './components/ErrorComponent';
// import AlbumComponent from './components/AlbumComponent';
// import TrackComponent from './components/TrackComponent';
//import SearchResultComponent from './components/SearchResultComponent';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={SearchFormComponent}/>
          <Route path='/search/:search_type/:search_text' component={SearchFormComponent}/>
          <Route component={ErrorComponent}/>
        </Switch>
        {/* <Route path="/search/artist/:search_text" exact component={ArtistComponent}></Route>
        <Route path="/search/album/:search_text" exact component={AlbumComponent}></Route>
        <Route path="/search/track/:search_text" exact component={TrackComponent}></Route> */}
      </div>
    );
  }
}

export default App;
