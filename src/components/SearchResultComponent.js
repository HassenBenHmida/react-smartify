import React, { Component } from 'react';
import ArtistComponent from './ArtistComponent'
import AlbumComponent from './AlbumComponent'
import TrackComponent from './TrackComponent'
import ErrorComponent from './ErrorComponent'
import {search} from '../lib/SpotifyUtil';

class searchResultComponent extends Component{
    constructor(props){
      super(props)
      this.state = {
        search_result: null
      }

      this.doSearch = this.doSearch.bind(this)
    }

    doSearch(search_text, searchfor) {
        search(search_text, searchfor).then(
          json => {
            this.setState({search_result: json})
        })
    }

    render() {      
      let searchfor = undefined

      if((this.props.match && (this.props.match.params.type === "artist")) || (this.props.search_type === 'artist')){
        searchfor = "artist"
      }else if((this.props.match && (this.props.match.params.type === "album")) || (this.props.search_type === 'album')){
        searchfor = "album"
      }else if((this.props.match && (this.props.match.params.type === "track")) || (this.props.search_type === 'track')){
        searchfor = "track"
      }

      let array_type = ['artist', 'album', 'track']
      if(this.props.match && array_type.indexOf(searchfor) !== -1){
        this.doSearch(this.props.match.params.search_text, searchfor)
      }
      
      let result = undefined
      if(this.props.objSearchResult){
        result = this.props.objSearchResult
      }else if(this.state.search_result){
        result = this.state.search_result
      }

      let component = undefined
      if (result && searchfor === 'artist'){
        component = 'artist'
      }else if (result && searchfor === 'album'){
        component = 'album'
      }else if (result && searchfor === 'track'){
        component = 'track'
      }

      return (
        <div className="col-sm-12">
          <div className="row">
                {
                  (component === 'artist') &&
                    <ArtistComponent artists={result.artists.items} />
                }

                {
                  (component === 'album') &&
                    <AlbumComponent albums={result.albums.items} />
                }

                {
                  (component === 'track') &&
                    <TrackComponent tracks={result.tracks.items} />
                }

                {
                  (!component) && 
                    <ErrorComponent />
                }
              
          </div>
        </div>
      );
    }
  }

  export default searchResultComponent;