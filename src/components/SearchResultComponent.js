import React, { Component } from 'react';
import ArtistComponent from './ArtistComponent'
import AlbumComponent from './AlbumComponent'
import TrackComponent from './TrackComponent'
import {search} from '../lib/SpotifyUtil';
import 'font-awesome/css/font-awesome.min.css';

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

    loading(){
      if((document.getElementById("spinner"))&&(document.getElementById("noresult"))){
        setTimeout(
          function() {
            document.getElementById("spinner").classList.add('hide');
            document.getElementById("noresult").classList.remove('hide');
          }, 10000)
          return true
      }
      
      return false
    }

    render() {
      return (
        <div className="col-sm-12"><br />
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
                <div id="loading" className="col-sm-12">
                {
                  (!this.state.search_result) && this.loading() &&
                    <div>
                      <div id="spinner" className="text-center">
                        <i className="fa fa-spinner fa-spin"></i>
                      </div>
                      <div id="noresult" className="hide">
                        <div>
                          <div className={"alert alert-warning"} role="alert">
                            It seems like there is no result or there is a problem !
                          </div>
                        </div>
                      </div>
                    </div>
                }
                </div>
              
          </div>
        </div>
      );
    }
  }

  export default searchResultComponent;