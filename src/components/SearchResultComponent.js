import React, { Component } from 'react';
import ArtistComponent from './ArtistComponent';
import AlbumComponent from './AlbumComponent';
import TrackComponent from './TrackComponent';
//  import {search} from '../lib/SpotifyUtil';
import 'font-awesome/css/font-awesome.min.css';
import { Route, Switch } from 'react-router-dom';
class searchResultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="col-sm-12">
        <br />
        <div className="row">
          {
            <Switch>
              <Route path="/search/artist/:search_text/:art_id?/:alb_id?/:tra_id?/" component={ArtistComponent} />
              <Route path="/search/album/:search_text/:alb_id?/:tra_id?/" component={AlbumComponent} />
              <Route path="/search/track/:search_text/:tra_id?/" component={TrackComponent} />
            </Switch>

            /* passing 
            ((this.props.match.params.search_type === 'aritst') &&
              <Route path='/search/:search_type/:search_text/:art_id?/:alb_id?/:tra_id?/' component={ArtistComponent}/>)
            ||
            ((this.props.match.params.search_type === 'album') &&
              <Route path='/search/:search_type/:search_text/:alb_id?/:tra_id?/' component={AlbumComponent}/>)
            ||
            ((this.props.match.params.search_type === 'track') &&
              <Route path='/search/:search_type/:search_text/:tra_id?/' component={TrackComponent}/>)
              */
          }
        </div>
      </div>
    );
  }
}

export default searchResultComponent;
