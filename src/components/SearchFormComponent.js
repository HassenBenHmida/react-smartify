import React, { Component } from 'react';
import SearchResultComponent from './SearchResultComponent';

function AlertWarning(props){
  return (
    <div className="col-sm-12">
      <div className={"alert alert-warning " + props.warning} role="alert">
        {props.error}
      </div>
    </div>
  )
}

class SearchFormComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        search_text: '',
        search_type: '',
        search: false,
        disable_search: true,
        warning: 'hide',
        error:''
      }
      
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleChangeInput = this.handleChangeInput.bind(this)
      this.search = this.search.bind(this)
    }

    componentDidMount(){
      if((this.props.match && this.props.match.params.type && this.props.match.params.search_text)){
        this.setState({search_type: this.props.match.params.type})
        this.setState({search_text: this.props.match.params.search_text})
        this.search()
      }
    }

    handleChangeInput(e){
      this.setState({search:false})
      if(e.target.value.replace(/ /g, '').length > 0){
        this.setState({disable_search: false})
        this.setState({search_text: e.target.value})
      }else{
        this.setState({disable_search: true})
        this.setState({search_text: ''})
      }
    }
      
    handleSelectChange(e){
      this.setState({search_type: e.target.value})
      this.setState({search_result: undefined})
      this.setState({search:false})
    }

    search(){
      if((this.state.search_text && this.state.search_type) || (this.props.match.params.type && this.props.match.params.search_text))
        this.setState({search:true, warning:'hide', error: ''})
      else {
        this.setState({warning:'show', error: 'Please check the form data.'})
      }
    }

    render() {
      return (
        <div className="card">
          <h4 className="card-header">Welcome To Smartify Application</h4>
          <div className="card-body">
            <div className="card-text">
              <div className="row">
                <AlertWarning warning={this.state.warning} error={this.state.error} />
                <div className="col-sm-6">
                  <legend className="col-form-legend col-sm-12">What Are You Looking For ?</legend>
                  <input className="form-control" type='text' onChange={this.handleChangeInput} value={this.state.search_text} />
                </div>
                <div className="col-sm-6">
                  <fieldset className="form-group">
                    <div className="row">
                      <legend className="col-form-legend col-sm-12">Select Your Choice :</legend>
                      <div className="col-sm-12">
                        <select className="custom-select" value={this.state.search_type} onChange={this.handleSelectChange}>
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
                  {/* <button onClick={this.doSearch} className="btn btn-primary" disabled={this.state.disable_search}>Search</button> */}
                  <button onClick={this.search} className="btn btn-primary" disabled={this.state.disable_search}>Search</button>
                </div>

                <div className="col-sm-12">
                  {
                    (this.state.search) &&
                      <SearchResultComponent search_text={this.state.search_text} search_type={this.state.search_type} />
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