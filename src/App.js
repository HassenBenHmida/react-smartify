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
          {/* <Route exact path='/' component={SearchFormComponent}/> */}
          <Switch>
            <Route path='/search/:search_type/:search_text/:art_id?/:alb_id?/:tra_id?' component={SearchFormComponent}/>
            <Route path='/' exact component={SearchFormComponent}/>
            <Route component={ErrorComponent}/>
          </Switch>
      </div>
    );
  }
}

export default App;
