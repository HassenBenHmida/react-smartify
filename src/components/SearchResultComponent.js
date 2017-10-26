import React, { Component } from 'react';
import ArtistComponent from './ArtistComponent'
import AlbumComponent from './AlbumComponent'
import TrackComponent from './TrackComponent'

class searchResultComponent extends Component{
    constructor(props){
      super(props)
      this.state = {
        search_result: null
      }
    }

    render() {
      return (
        <div className="col-sm-12">
          <div className="row">
              {
                (this.props.search_type === 'artist' && this.props.objSearchResult) ?
                <ArtistComponent artists={this.props.objSearchResult.artists.items} />
                : null
              }

              {
                (this.props.search_type === 'album' && this.props.objSearchResult) ?
                  <AlbumComponent albums={this.props.objSearchResult.albums.items} />
                : null
              }

              {
                (this.props.search_type === 'track'  && this.props.objSearchResult) ?
                  <TrackComponent tracks={this.props.objSearchResult.tracks.items} />
                : null
              }
          </div>
        </div>
      );
    }
  }

  export default searchResultComponent;