import React, { Component } from 'react';
import SearchResultComponent from './SearchResultComponent';
import FavoritesComponent from './FavoritesComponent'
import { Switch, Route } from 'react-router-dom';

class SearchFormComponent extends Component {
    constructor(props) {
      super(props)

      let array_type = ['artist', 'album', 'track'] //if the params of search type isn't one of these the state will contain nothing

      this.state = {
        search_text: (this.props.match.params.search_text) ? this.props.match.params.search_text : '',
        search_type: (this.props.match.params.search_type)&&(array_type.indexOf(this.props.match.params.search_type) !== -1) ? this.props.match.params.search_type : '',
        search: ((this.props.match.params.search_text) && (this.props.match.params.search_type)) ? true : false
      }
      
      this.search = this.search.bind(this)
    }

    search(search_type = null, search_text = null){
      this.props.history.push('/search/'+this.state.search_type+'/'+this.state.search_text)
      this.setState({search:true})
    }

    render() {
      return (
        <div className="card">
          <div className="card-header">
            <h4 className="float-left">Welcome To Smartify Application</h4>
            <div className="float-right"><FavoritesComponent /></div>
          </div>
          <div className="card-body">
            <div className="card-text">
              <div className="row">
                <div className="col-sm-6">
                  <legend className="col-form-legend col-sm-12">What Are You Looking For ?</legend>
                  <input className="form-control" type='text' onChange={(e) => this.setState({search_text:e.target.value, search:false})} value={this.state.search_text} />
                </div>
                <div className="col-sm-6">
                  <fieldset className="form-group">
                    <div className="row">
                      <legend className="col-form-legend col-sm-12">Select Your Choice :</legend>
                      <div className="col-sm-12">
                        <select className="custom-select" onChange={(e) => this.setState({search_type:e.target.value, search:false})} value={this.state.search_type}>
                          <option value=''>Please choose the type ..</option>
                          <option value="artist">Artist</option>
                          <option value="album">Album</option>
                          <option value="track">Track</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="mx-auto">
                  <button onClick={this.search} className="btn btn-primary" disabled={!this.state.search_text || !this.state.search_type}>Search</button>
                </div>

                <div className="col-sm-12">
                  {
                    (this.state.search) &&
                    <Switch>
                      {(this.state.search_type === "track") ? <Route path='/search/:search_type/:search_text/:tra_id?' component={SearchResultComponent}/> : null}
                      {(this.state.search_type === "album") ? <Route path='/search/:search_type/:search_text/:alb_id?/:tra_id?' component={SearchResultComponent}/> : null}
                      {(this.state.search_type === "artist") ? <Route path='/search/:search_type/:search_text/:art_id?/:alb_id?/:tra_id?' component={SearchResultComponent}/> : null}
                    </Switch>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        
        </div>
      );
    }
  }

  export default SearchFormComponent;