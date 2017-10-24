import React, { Component } from 'react';
import SearchResultComponent from './SearchResultComponent';
import {search} from '../lib/SpotifyUtil';


class SearchFormComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        search_text: '',
        search_type: 'artist',
        search_result: undefined,
        disable_search: true
      }
    }

    doSearch() {
        search(this.state.search_text, this.state.search_type).then(
          json => {
            this.setState({search_result: json})
        })
      }
  
    handleChange(e){
      if(e.target.value.length > 0){
        this.setState({disable_search: false})
        this.setState({search_text: e.target.value})
      }else{
        this.setState({disable_search: true})
        this.setState({search_text: ''})
      }
    }
      

    render() {
      return (
        <div className="card">
          <h4 className="card-header">Welcome To Smartify Application</h4>
          <div className="card-body">
            <div className="card-text">
              <div className="row">
                <div className="col-sm-6">
                  <legend className="col-form-legend col-sm-12">What Are You Looking For ?</legend>
                  <input className="form-control" type='text' onChange={ e => this.handleChange(e)} value={this.state.search_text} />
                </div>
                <div className="col-sm-6">
                  <fieldset className="form-group">
                    <div className="row">
                      <legend className="col-form-legend col-sm-12">Select Your Choice :</legend>
                      <div className="col-sm-12">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input className="form-check-input" type='radio' name="gridRadios" checked={(this.state != null) ? this.state.search_type === 'artist' : 0} onChange={e => this.setState({search_type: 'artist'})} />
                            Artist
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input className="form-check-input" type='radio' name="gridRadios" checked={(this.state != null) ? this.state.search_type === 'album' : 0} onChange={e => this.setState({search_type: 'album'})} /> 
                            Album
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label">
                            <input className="form-check-input" type='radio' name="gridRadios" checked={(this.state != null) ? this.state.search_type === 'track' : 0} onChange={e => this.setState({search_type: 'track'})} /> 
                            Track
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="mx-auto">
                  <button onClick={ e => this.doSearch()} className="btn btn-primary" disabled={this.state.disable_search}>Search</button>
                </div>

                <div className="col-sm-12">
                  <SearchResultComponent objSearchResult={this.state.search_result} search_type={this.state.search_type} />
                </div>
              </div>
            </div>
          </div>
        
        </div>
      );
    }
  
    // Private methods
  

  }

  export default SearchFormComponent;