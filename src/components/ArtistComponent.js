import React, { Component } from 'react';
import { search } from '../lib/SpotifyUtil';
import AlbumComponent from './AlbumComponent';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { addHistory } from '../actions';
import { connect } from 'react-redux';

class ArtistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined,
      selectedArtist: undefined
    };
    this.doSearch();
  }

  componentWillReceiveProps(nextProps) {
    // DoSearch is called in the constructor = never called again when the component is displayed and we need to refresh it using another search text
    if (this.props.match.params.search_text !== nextProps.match.params.search_text) {
      this.doSearch(nextProps.match.params.search_text);
    }
  }

  doSearch(search_text = null) {
    search_text = !search_text ? this.props.match.params.search_text : search_text;
    if (search_text) {
      search(search_text, 'artist').then(json => {
        this.setState({ items: json.artists.items });
      });
    }
  }

  handleRouter(artist_id, artist_name) {
    this.props.history.push('/search/artist/' + this.props.match.params.search_text + '/' + artist_id + '/');
    this.setState({ selectedArtist: artist_id });

    // clicking on an artist save his name in history
    // Check if his name is already exists
    let result;
    result = this.props.search_history.filter(
      element => element.search_text.toLowerCase() === artist_name.toLowerCase()
    );
    if (!result[0]) {
      this.props.addHistory({ search_type: 'artist', search_text: artist_name });
    }
  }

  artistCard(artist, aria_expanded = false) {
    return (
      <div className="card" key={artist.id}>
        <div className="card-header" role="tab" id={('card-header' + artist.id.toString()).replace(/ /g, '')}>
          <h5 className="mb-0">
            <a
              data-toggle="collapse"
              aria-expanded={aria_expanded}
              href={'#tabpanel-' + artist.id.toString()}
              onClick={e => this.handleRouter(artist.id, artist.name)}
              aria-controls={'tabpanel-' + artist.id.toString()}
            >
              {artist.name}
            </a>
          </h5>
        </div>

        <div
          id={'tabpanel-' + artist.id.toString()}
          className={aria_expanded === true ? 'collapse show' : 'collapse'}
          role="tabpanel"
          aria-labelledby={('card-header-' + artist.id.toString()).replace(/ /g, '')}
          data-parent="#accordion-artists"
        >
          <div className="card-body">
            <div className="card">
              {artist.imageOfThis ? (
                <img className="card-img-top" src={artist.imageOfThis} alt={'Image : ' + artist.name} />
              ) : null}
              <div className="card-body">
                <h4 className="card-title">{artist.name}</h4>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <a href={artist.href} className="btn btn-primary">
                  Link
                </a>
              </div>
              <br />
              {this.state.selectedArtist === artist.id || this.props.match.params.art_id === artist.id ? (
                //  without this test all the album accordians will receive the same id (artist id in the path) which generate an error => only the first album accordian can be opened
                //  the ids should match the id stored by clicking on the name of artist or the id given in the route
                <Route path="/search/artist/:search_text/:art_id?/:alb_id?/:tra_id?/" component={AlbumComponent} />
              ) : (
                <div id="spinner" className="text-center">
                  <i className="fa fa-spinner fa-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col-sm-12">
        {this.state.items ? (
          <div id="accordion-artists" role="tablist">
            <div className="alert alert-secondary" role="alert">
              Artist List
            </div>
            {this.state.items.map(item => this.artistCard(item, this.props.match.params.art_id === item.id))}
          </div>
        ) : (
          <div id="spinner" className="text-center">
            <i className="fa fa-spinner fa-spin" />
          </div>
        )}
      </div>
    );
  }
}

const propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  history: PropTypes.object,
  search_history: PropTypes.object,
  search_text: PropTypes.string,
  art_id: PropTypes.string,
  addHistory: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  search_history: state.formReducerHandler
});

const mapDispatchToProps = {
  addHistory
};

ArtistComponent = connect(mapStateToProps, mapDispatchToProps)(ArtistComponent);

ArtistComponent.propTypes = propTypes;
export default ArtistComponent;
