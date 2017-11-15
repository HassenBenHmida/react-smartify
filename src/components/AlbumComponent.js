import React, { Component } from 'react';
import { getAlbumsByArtist, search } from '../lib/SpotifyUtil';
import TrackComponent from './TrackComponent';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
class AlbumComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined,
      selectedAlbum: undefined
    };

    this.getAlbumsList();
  }

  componentWillReceiveProps(nextProps) {
    //  ?
    if (this.props.match.params.search_type !== 'album') {
      // this.props.match.params = false
      if (nextProps.match.prams && this.props.match.params.art_id !== nextProps.match.params.art_id) {
        this.getAlbumsList(null, nextProps.match.prams.art_id);
      }
    } else {
      // search_type = album
      if (this.props.match.params.search_type !== nextProps.match.prams.search_type) {
        this.getAlbumsList(nextProps.match.params.search_text);
      }
    }
    /*  if(this.props.match.params.search_text !== nextProps.match.params.search_text){
            this.getAlbumsList(nextProps.match.params.search_text)
        } */
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
    let path = this.props.history.location.pathname.includes('artist')
      ? '/search/artist/' + this.props.match.params.search_text + '/' + this.props.match.params.art_id + '/' + album_id
      : '/search/album/' + this.props.match.params.search_text + '/' + album_id;
    this.props.history.push(path);
  }

  albumCard(album, dataparent, aria_expanded = false) {
    return (
      <div className="card" key={album.id}>
        <div className="card-header" role="tab" id={('card-header' + album.id.toString()).replace(/ /g, '')}>
          <h5 className="mb-0">
            <a
              data-toggle="collapse"
              aria-expanded={aria_expanded}
              href={'#tabpanel-' + album.id.toString()}
              onClick={e => this.handleRouter(album.id)}
              aria-controls={'tabpanel-' + album.id.toString()}
            >
              {album.name}
            </a>
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

              {this.state.selectedAlbum === album.id || this.props.match.params.alb_id === album.id ? ( // without this test all the track accordians will receive the same id (album id in the path) which generate an error => only the first track accordian can be opened
                <Switch>
                  <Route path="/search/artist/:search_text/:art_id?/:alb_id?/:tra_id?/" component={TrackComponent} />
                  <Route path="/search/album/:search_text/:alb_id?/:tra_id?/" component={TrackComponent} />
                </Switch>
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
