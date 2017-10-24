import React, { Component } from 'react';
import ArtistComponent from './ArtistComponent'
import AlbumComponent from './AlbumComponent'
import TrackComponent from './TrackComponent'

class searchResultComponent extends Component{
    constructor(props){
      super(props)
      this.state = {
        search_result: this.props.objSearchResult
      }
    }
  
    render() {
      var results = this.props.objSearchResult;

      var albums = [];
      var artists = [];
      var tracks = [];

      console.log(results)

      if(this.props.search_type === 'artist'){
        if(results){
          Object.keys(results.artists.items).map(key => 
            artists.push(results.artists.items[key])
          )
        }
      }

      if(this.props.search_type === 'album'){
        if(results){
          Object.keys(results.albums.items).map(key => 
            albums.push(results.albums.items[key])
          )
        }
      }

      if(this.props.search_type === 'track'){
        if(results){
          Object.keys(results.tracks.items).map(key => 
            tracks.push(results.tracks.items[key])
          )
        }
      }
      
      

      return (
        <div className="row">
            {
              (this.props.search_type === 'artist') ?
                <ArtistComponent artists={artists} />
              : ''
            }

            {
              (this.props.search_type === 'album') ?
                <AlbumComponent albums={albums} />
              : ''
            }

            {
              (this.props.search_type === 'track') ?
                <TrackComponent tracks={tracks} />
              : ''
            }
        </div>
      );
    }
  }

  export default searchResultComponent;