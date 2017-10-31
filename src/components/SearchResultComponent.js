import React, { Component } from 'react';
import ArtistComponent from './ArtistComponent'
import AlbumComponent from './AlbumComponent'
import TrackComponent from './TrackComponent'
import {search} from '../lib/SpotifyUtil';

class searchResultComponent extends Component{
    constructor(props){
      super(props)
      this.state = {
        search_result: null,
        component:undefined
      }

      this.doSearch = this.doSearch.bind(this)
    }

    doSearch() {
        search(this.props.search_text, this.props.search_type).then(
          json => {
            this.setState({search_result: json})
        })
    }

    componentWillMount(){      
      let array_type = ['artist', 'album', 'track']
      if(this.props.search_text && array_type.indexOf(this.props.search_type) !== -1){
        this.doSearch()
      }
    }

    render() {
      return (
        <div className="col-sm-12">
          <div className="row">
                {
                  (this.state.search_result && this.props.search_type === 'artist') &&
                    <ArtistComponent artists={this.state.search_result.artists.items} />
                }

                {
                  (this.state.search_result && this.props.search_type === 'album') &&
                    <AlbumComponent albums={this.state.search_result.albums.items} />
                }

                {
                  (this.state.search_result && this.props.search_type === 'track') &&
                    <TrackComponent tracks={this.state.search_result.tracks.items} />
                }

                {
                  (!this.state.search_result) && 
                    <div>Loading ...</div>
                }
              
          </div>
        </div>
      );
    }
  }

  export default searchResultComponent;