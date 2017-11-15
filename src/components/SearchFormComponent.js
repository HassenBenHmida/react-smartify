import React, { Component } from 'react';
import SearchResultComponent from './SearchResultComponent';
import FavoritesComponent from './FavoritesComponent';
import { Route } from 'react-router-dom';
import { addHistory } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_text: this.props.match.params.search_text || '',
      search_type: this.props.match.params.search_type || '',
      search: this.props.match.params.search_type && this.props.match.params.search_text,
      total_fav: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.tracks) {
      const total = nextProps.tracks.reduce(function(sum, value) {
        return sum + 1;
      }, 0);
      this.setState({ total_fav: total });
    }
  }

  search() {
    this.props.history.push('/search/' + this.state.search_type + '/' + this.state.search_text + '/');
    this.props.addHistory({ search_type: this.state.search_type, search_text: this.state.search_text });
    // console.log(this.props);
    this.setState({ search: true });
  }

  getHistory() {
    // console.log(this.props.form);
    return this.props.search_history.map((item, key) => <option key={key} value={item.search_text} />);
  }

  handleInputChange(e) {
    let result;
    result = this.props.search_history.filter(element => element.search_text === e.target.value); // Filter last search with this text
    this.setState({ search_text: e.target.value }); // save the state search text
    if (result[0]) {
      // in case of : the search text is already exist : change the type as well
      this.setState({ search_type: result[0].search_type });
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="float-left">Welcome To Smartify Application</h4>
          <div className="float-right">
            {this.state.total_fav > 0 ? (
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#favoriteTracks">
                Your Favorite Tracks
              </button>
            ) : null}
            <FavoritesComponent />
          </div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <div className="row">
              <div className="col-sm-6">
                <legend className="col-form-legend col-sm-12">What Are You Looking For ?</legend>
                <input
                  className="form-control"
                  type="text"
                  onChange={e => this.handleInputChange(e)}
                  value={this.state.search_text}
                  list="search_history"
                />

                <datalist id="search_history">{this.getHistory()}</datalist>
              </div>
              <div className="col-sm-6">
                <fieldset className="form-group">
                  <div className="row">
                    <legend className="col-form-legend col-sm-12">Select Your Choice :</legend>
                    <div className="col-sm-12">
                      <select
                        className="custom-select"
                        onChange={e => this.setState({ search_type: e.target.value, search: false })}
                        value={this.state.search_type}
                      >
                        <option value="">Please choose the type ..</option>
                        <option value="artist">Artist</option>
                        <option value="album">Album</option>
                        <option value="track">Track</option>
                      </select>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="mx-auto">
                <button
                  onClick={e => this.search()}
                  className="btn btn-primary"
                  disabled={!(this.state.search_text && this.state.search_type)}
                >
                  Search
                </button>
              </div>

              <div className="col-sm-12">
                {
                  //  (this.state.search) &&
                  <Route
                    path="/search/:search_type/:search_text/:art_id?/:alb_id?/:tra_id?"
                    component={SearchResultComponent}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  tracks: PropTypes.object,
  search_history: PropTypes.object,
  addHistory: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  tracks: state.tracksReducerHandler,
  search_history: state.formReducerHandler
});

const mapDispatchToProps = {
  addHistory
};

SearchFormComponent = connect(mapStateToProps, mapDispatchToProps)(SearchFormComponent);

SearchFormComponent.propTypes = propTypes;

export default SearchFormComponent;
