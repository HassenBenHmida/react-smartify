import React, { Component } from 'react';
import ArtistComponent from './ArtistComponent'
import AlbumComponent from './AlbumComponent'
import TrackComponent from './TrackComponent'
import {search} from '../lib/SpotifyUtil';
import 'font-awesome/css/font-awesome.min.css';
import { Switch, Route } from 'react-router-dom';
class searchResultComponent extends Component{
    constructor(props){
      super(props)
      this.state = {
        search_result: null,
        component:undefined,
        search_text:undefined,
        search_type:undefined
      }

      this.doSearch = this.doSearch.bind(this)
    }

    doSearch() {
        search(this.state.search_text, this.state.search_type).then(
          json => {
            this.setState({search_result: json})
        })
    }

    componentWillMount(){      
      let array_type = ['artist', 'album', 'track']

      if(this.props.match && (this.props.match.params.search_text && array_type.indexOf(this.props.match.params.search_type) !== -1)){
        this.setState({search_text:this.props.match.params.search_text, search_type:this.props.match.params.search_type})
      }
    }

    componentDidMount(){
      if(this.state.search_text && this.state.search_type){
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
                    (this.state.search_result) &&
                    <Switch>
                      <Route path='/search/artist/:search_text' render={(props) => (
                        <ArtistComponent {...props} artists={JSON.stringify(this.state.search_result.artists.items)} />
                      )}/>
                      <Route path="/search/album/:search_text" render={(props) => (
                        <AlbumComponent {...props} albums={JSON.stringify(this.state.search_result.albums.items)} />
                      )}/>
                      <Route path="/search/track/:search_text" render={(props) => (
                        <TrackComponent {...props} tracks={JSON.stringify(this.state.search_result.tracks.items)} />
                      )}/>
                    </Switch>
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