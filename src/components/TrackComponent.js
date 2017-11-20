import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions';
import { getSongsByAlbum, search } from '../lib/SpotifyUtil';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TrackComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined
    };
    this.getTrackList();
  }

  trackExistInStore(track) {
    let result;
    result = this.props.tracks.filter(item => item.id === track.id); // Filter the object
    let number = result.reduce(function(accumulator, currentValue) {
      // If object lenght = 0 then return false
      return accumulator + 1;
    }, 0);
    return number > 0;
  }

  handleButton(track) {
    if (this.trackExistInStore(track)) {
      this.props.removeFavorite(track);
    } else {
      this.props.addFavorite(track);
    }
  }

  getTrackList(search_text = null) {
    // Search for albums
    if (this.props.match && this.props.match.params.alb_id) {
      getSongsByAlbum(this.props.match.params.alb_id).then(json => {
        this.setState({ items: json.tracks.items });
      });
    } else if ((this.props.match && this.props.match.params.search_text) || search_text) {
      search_text = !search_text ? this.props.match.params.search_text : search_text;
      search(search_text, 'track').then(json => {
        this.setState({ items: json.tracks.items });
      });
    }
  }

  handleRouter(track_id) {
    let path;
    if (this.props.match.params.search_type === 'artist') {
      path =
        '/search/artist/' +
        this.props.match.params.search_text +
        '/' +
        this.props.match.params.art_id +
        '/' +
        this.props.match.params.alb_id +
        '/' +
        track_id;
      this.props.history.push({
        pathname: path,
        search_text: this.props.match.params.search_text,
        search_type: this.props.match.params.search_type,
        art_id: this.props.match.params.art_id,
        alb_id: this.props.match.params.alb_id,
        tra_id: track_id
      });
    } else if (this.props.match.params.search_type === 'album') {
      path =
        '/search/album/' + this.props.match.params.search_text + '/' + this.props.match.params.alb_id + '/' + track_id;
      this.props.history.push({
        pathname: path,
        search_text: this.props.match.params.search_text,
        search_type: this.props.match.params.search_type,
        alb_id: this.props.match.params.alb_id,
        tra_id: track_id
      });
    } else {
      path = '/search/track/' + this.props.match.params.search_text + '/' + track_id;
      this.props.history.push({
        pathname: path,
        search_text: this.props.match.params.search_text,
        search_type: this.props.match.params.search_type,
        tra_id: track_id
      });
    }
  }

  trackCard(track, dataparent, aria_expanded = false) {
    return (
      <div className="card" key={track.id}>
        <div className="card-header" role="tab" id={('card-header' + track.id.toString()).replace(/ /g, '')}>
          <h5 className="mb-0">
            <Link
              to={track.id}
              data-toggle="collapse"
              data-target={'#tabpanel-' + track.id.toString()}
              aria-expanded={aria_expanded}
              onClick={e => (this.props.source !== 'favComponent' ? this.handleRouter(track.id) : null)}
              aria-controls={'tabpanel-' + track.id.toString()}
            >
              {track.name}
            </Link>
          </h5>
        </div>

        <div
          id={'tabpanel-' + track.id.toString()}
          className={aria_expanded === true ? 'collapse show' : 'collapse'}
          role="tabpanel"
          aria-labelledby={('card-header-' + track.id.toString()).replace(/ /g, '')}
          data-parent={dataparent}
        >
          <div className="card-body">
            <div className="card">
              <div className="card-body">
                <div className="float-sm-right">
                  {
                    <button onClick={e => this.handleButton(track)}>
                      <i className={this.trackExistInStore(track) === false ? 'fa fa-heart-o' : 'fa fa-heart'} />
                    </button>
                  }
                </div>
                <h4 className="card-title">{track.name}</h4>
                {track.duration_ms ? (
                  <h6 className="card-subtitle mb-2 text-muted">Duration : {~~(track.duration_ms / 1000)}s</h6>
                ) : null}
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <a href={track.href} className="btn btn-primary">
                  Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let accordian_id =
      this.props.match && this.props.match.params.tra_id
        ? 'accordion-track-' + this.props.match.params.tra_id
        : 'accordion-tra';
    return (
      <div className="col-sm-12">
        <div id={accordian_id} role="tablist">
          <div className="alert alert-secondary" role="alert">
            Track List
          </div>
          {this.state.items
            ? this.state.items.map(item =>
                this.trackCard(item, '#' + accordian_id, this.props.match.params.tra_id === item.id)
              )
            : null}

          {this.props.tracks && this.props.source === 'favComponent'
            ? this.props.tracks.map(item => this.trackCard(item, '#' + accordian_id, false))
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  tracks: state.tracksReducerHandler
});

const mapDispatchToProps = {
  addFavorite,
  removeFavorite
};

TrackComponent = connect(mapStateToProps, mapDispatchToProps)(TrackComponent);

const propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  history: PropTypes.object,
  tracks: PropTypes.object,
  search_text: PropTypes.string,
  search_type: PropTypes.string,
  art_id: PropTypes.string,
  alb_id: PropTypes.string,
  removeFavorite: PropTypes.func,
  addFavorite: PropTypes.func,
  source: PropTypes.string
};

TrackComponent.propTypes = propTypes;

export default TrackComponent;
