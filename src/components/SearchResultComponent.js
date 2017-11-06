import React, { Component } from 'react';
import ArtistComponent from './ArtistComponent'
import AlbumComponent from './AlbumComponent'
import TrackComponent from './TrackComponent'
import {search} from '../lib/SpotifyUtil';
import 'font-awesome/css/font-awesome.min.css';
//import { Route } from 'react-router-dom';
class searchResultComponent extends Component{
    constructor(props){
      super(props)
      this.state = {
        search_result: null,
        component:undefined,
        search_text:undefined,
        search_type:undefined,
        idofthis:undefined
      }

      this.doSearch = this.doSearch.bind(this)
    }

    doSearch(search_text, search_type) {
        switch(search_type) {
          case "artist":
            search(search_text, search_type).then(
              json => {
                this.setState({search_result: json.artists.items, component:ArtistComponent, idofthis:this.props.match.params.art_id})
            })
            break
          case "album":
            search(search_text, search_type).then(
              json => {
                this.setState({search_result: json.albums.items, component:AlbumComponent, idofthis:this.props.match.params.alb_id})
            })
            break
          case "track":
            search(search_text, search_type).then(
              json => {
                this.setState({search_result: json.tracks.items, component:TrackComponent, idofthis:this.props.match.params.tra_id})
            })
            break
          default:
            this.setState({search_result:undefined})
        }
    }

    /* componentWillMount(){      
      let array_type = ['artist', 'album', 'track']

      if(this.props.match && (this.props.match.params.search_text && array_type.indexOf(this.props.match.params.search_type) !== -1)){
        this.setState({search_text:this.props.match.params.search_text, search_type:this.props.match.params.search_type})
      }
    } */

    componentDidMount(){
      let array_type = ['artist', 'album', 'track']
      
      if(this.props.match && (this.props.match.params.search_text && array_type.indexOf(this.props.match.params.search_type) !== -1)){
        this.setState({search_text:this.props.match.params.search_text, search_type:this.props.match.params.search_type})
        this.doSearch(this.props.match.params.search_text, this.props.match.params.search_type)
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
            <div className="col-sm-12">
              <div id="accordion-result" role="tablist">
                  <div className="alert alert-secondary" role="alert">
                      {this.props.match.params.search_type} List
                  </div>
                  {
                    (this.state.search_result) && (this.state.component) &&
                      this.state.search_result.map((item, key) => (
                          <this.state.component {...this.props} 
                                                aria_expanded={this.state.idofthis === item.id ? true : false}
                                                imageOfThis={(item.images && item.images[0]) ? item.images[0].url : null}
                                                href={(item.href) ? item.href : null}
                                                duration_ms={(item.duration_ms) ? item.duration_ms : null}
                                                key={key} 
                                                id={item.id} 
                                                name={item.name} 
                                                accordion={'#accordion-result'} />
                      ))
                  }

              </div>
            </div>

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