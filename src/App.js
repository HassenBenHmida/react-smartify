import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import {search} from './lib/SpotifyUtil'

class SearchList extends Component{
  constructor(props){
    super(props)
    this.state = {
      search_result: undefined
    }
  }

  render() {
    return (
      <div className="row">
        <pre style={{textAlign: 'left'}}>{this.props.search_result}</pre>
      </div>

      // <div className="row">
      //   <div className="col-4">
      //     <div className="list-group" id="list-tab" role="tablist">
      //       <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
      //       <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
      //       <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
      //       <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
      //     </div>
      //   </div>
      //   <div className="col-8">
      //     <div className="tab-content" id="nav-tabContent">
      //       <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
      //       <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
      //       <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
      //       <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search_text: '',
      search_type: 'artist',
      search_result: undefined
    }
  }

  render() {
    return (
      <div className="card">
        <h4 className="card-header">Welcome To Smartify Application</h4>
        <div className="card-body">
          <h4 className="card-title">What Are You Looking For ?</h4>
          <p className="card-text">
            <input type='text' onChange={ e => this.setState({search_text: e.target.value})} value={(this.state != null) ? this.state.search_text : ''} /><br/>
  
            <input type='radio' checked={(this.state != null) ? this.state.search_type === 'artist' : 0} onChange={e => this.setState({search_type: 'artist'})} /> Artist
            <input type='radio' checked={(this.state != null) ? this.state.search_type === 'album' : 0} onChange={e => this.setState({search_type: 'album'})} /> Album
            <input type='radio' checked={(this.state != null) ? this.state.search_type === 'track' : 0} onChange={e => this.setState({search_type: 'track'})} /> Track
            <br/>
            <button onClick={ e => this.doSearch()} className="btn btn-primary">Search</button>
            {
              (this.state != null) ? (
                this.state.search_result ?
                <SearchList search_result={JSON.stringify(this.state.search_result, false, 3)}/>
                : undefined
              )
              : undefined
            }
          </p>
        </div>
      </div>
    );
  }

  // Private methods

  doSearch() {
    search(this.state.search_text, this.state.search_type).then(
      json => {
        this.setState({search_result: json})
    })
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
      </div>
    );
  }
}

export default App;
