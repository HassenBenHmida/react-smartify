import React, { Component } from 'react';
import { getAlbumsByArtist, search } from '../lib/SpotifyUtil';
import TrackComponent from './TrackComponent';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class AlbumComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined
    };

    this.getAlbumsList();
  }

  getAlbumsList(search_text = null, art_id = null) {
    // Search for albums
    if (this.props.match.params.art_id) {
      art_id = !art_id ? this.props.match.params.art_id : art_id;
      getAlbumsByArtist(this.props.match.params.art_id).then(json => {
        this.setState({ items: json.items });
      });
    } else {
      search_text = !search_text ? this.props.match.params.search_text : search_text;
      search(search_text, 'album').then(json => {
        this.setState({ items: json.albums.items });
      });
    }
  }

  handleRouter(album_id) {
    let path;
    if (this.props.match.params.search_type === 'artist') {
      path =
        '/search/artist/' + this.props.match.params.search_text + '/' + this.props.match.params.art_id + '/' + album_id;
      this.props.history.push({
        pathname: path,
        search_text: this.props.match.params.search_text,
        search_type: this.props.match.params.search_type,
        art_id: this.props.match.params.art_id,
        alb_id: album_id
      });
    } else {
      path = '/search/album/' + this.props.match.params.search_text + '/' + album_id;
      this.props.history.push({
        pathname: path,
        search_text: this.props.match.params.search_text,
        search_type: this.props.match.params.search_type,
        alb_id: album_id
      });
    }
  }

  albumCard(album, dataparent, aria_expanded = false) {
    return (
      <div className="card" key={album.id}>
        <div className="card-header" role="tab" id={('card-header' + album.id.toString()).replace(/ /g, '')}>
          <h5 className="mb-0">
            <Link
              to={album.id}
              data-toggle="collapse"
              data-target={'#tabpanel-' + album.id.toString()}
              aria-expanded={aria_expanded}
              onClick={e => this.handleRouter(album.id)}
              aria-controls={'tabpanel-' + album.id.toString()}
            >
              {album.name}
            </Link>
          </h5>
        </div>

        <div
          id={'tabpanel-' + album.id.toString()}
          className={aria_expanded === true ? 'collapse show' : 'collapse'}
          role="tabpanel"
          aria-labelledby={('card-header-' + album.id.toString()).replace(/ /g, '')}
          data-parent={dataparent}
        >
          <div className="card-body">
            <div className="card">
              {album.imageOfThis ? (
                <img className="card-img-top" src={album.imageOfThis} alt={'Image : ' + album.name} />
              ) : null}
              <div className="card-body">
                <h4 className="card-title">{album.name}</h4>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <a href={album.href} className="btn btn-primary">
                  Link
                </a>
              </div>
              <br />

              {this.props.match.params.alb_id === album.id ? ( // without this test all the track accordians will receive the same id (album id in the path) which generate an error => only the first track accordian can be opened
                <Route
                  path="/search/:search_type/:search_text/:art_id?/:alb_id?/:tra_id?/"
                  component={TrackComponent}
                />
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
    let accordian_id = this.props.match.params.alb_id
      ? 'accordion-album-' + this.props.match.params.alb_id
      : 'accordion-album';
    return (
      <div className="col-sm-12">
        <div id={accordian_id} role="tablist">
          <div className="alert alert-secondary" role="alert">
            Album List
          </div>
          {this.state.items ? (
            this.state.items.map(item =>
              this.albumCard(item, '#' + accordian_id, this.props.match.params.alb_id === item.id)
            )
          ) : (
            <div id="spinner" className="text-center">
              <i className="fa fa-spinner fa-spin" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  history: PropTypes.object,
  search_text: PropTypes.string,
  art_id: PropTypes.string,
  alb_id: PropTypes.string
};

AlbumComponent.propTypes = propTypes;

export default AlbumComponent;
