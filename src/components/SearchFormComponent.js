import React, { Component } from 'react';
import SearchResultComponent from './SearchResultComponent';
import FavoritesComponent from './FavoritesComponent'
import { Switch, Route } from 'react-router-dom';

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
        error:'',
        tra_id:undefined,
        alb_id:undefined,
        art_id:undefined
      }
      
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleChangeInput = this.handleChangeInput.bind(this)
      this.search = this.search.bind(this)
    }

    componentDidMount(){

      if((this.props.match && this.props.match.params.search_type && this.props.match.params.search_text)){

        this.setState({search_type: this.props.match.params.search_type})
        this.setState({search_text: this.props.match.params.search_text})

        if(this.props.match.params.art_id){
          this.setState({art_id: this.props.match.params.art_id})
        }
        if(this.props.match.params.alb_id){
          this.setState({alb_id: this.props.match.params.alb_id})
        }
        if(this.props.match.params.tra_id){
          this.setState({tra_id: this.props.match.params.tra_id})
        }

        this.search(this.props.match.params.search_type, this.props.match.params.search_text, true)
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
      if(this.state.search_text){
        this.setState({disable_search:false, warning:'hide', error: ''})
      }
    }

    search(search_type = null, search_text = null, keepRoute = false){
      //keepRoute => if the user click on the button search the route will be /search/text/type
      //if this function was triggred by the route => keep the params of route

      let array_type = ['artist', 'album', 'track']
      
      if((search_type && search_text) || (this.state.search_text && this.state.search_type)){
        search_type = (search_type && array_type.indexOf(search_type) !== -1) ? search_type : this.state.search_type
        search_text = (search_text) ? search_text : this.state.search_text


        this.setState({search:true, warning:'hide', error: ''})
        this.props.history.push('/search/'+search_type+'/'+search_text+'/')
        if(this.props.match.params.art_id && keepRoute){
          this.props.history.push(this.props.match.params.art_id+'/')
          if(this.props.match.params.alb_id){
            this.props.history.push(this.props.match.params.alb_id+'/')
            if(this.props.match.params.tra_id){
              this.props.history.push(this.props.match.params.tra_id)
            }
          }
        }
      }else{
        this.setState({warning:'show', error: 'Please check the form data.'})
      }
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
                    <Switch>
                      {(this.state.search_type === "track") ? <Route path='/search/:search_type/:search_text/:tra_id?' component={SearchResultComponent}/> : null}
                      {(this.state.search_type === "album") ? <Route path='/search/:search_type/:search_text/:alb_id?/:tra_id?' component={SearchResultComponent}/> : null}
                      {(this.state.search_type === "artist") ? <Route path='/search/:search_type/:search_text/:art_id?/:alb_id?/:tra_id?' component={SearchResultComponent}/> : null}
                      {/* <Route path='/search/:search_type/:search_text/:art_id?/:alb_id?/:tra_id?' component={SearchResultComponent}/> */}
                    </Switch>
                      //<SearchResultComponent search_text={this.state.search_text} search_type={this.state.search_type} />
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