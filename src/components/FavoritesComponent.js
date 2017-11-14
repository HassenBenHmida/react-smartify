import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions';
import TrackComponent from './TrackComponent';
import PropTypes from 'prop-types';

class FavoritesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="modal fade"
        ref="favoriteTracks"
        id="favoriteTracks"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="favoriteTracksLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="favoriteTracksLabel">
                Favorite Tracks
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div id="accordion-favorites" role="tablist">
                <div className="alert alert-secondary" role="alert">
                  Favorite List
                </div>
                {this.props.tracks.length && this.props.tracks.length >= 0 ? (
                  <TrackComponent source="favComponent" />
                ) : null}
                {/* (this.props.tracks.length && this.props.tracks.length >= 0) ?
                                    this.props.tracks.map((item, key) => (
                                        <TrackComponent
                                                object={item}
                                                imageOfThis={(JSON.parse(item).images && JSON.parse(item).images[0]) ? JSON.parse(item).images[0].url : null}
                                                href={(JSON.parse(item).href) ? JSON.parse(item).href : null}
                                                duration_ms={(JSON.parse(item).duration_ms) ? JSON.parse(item).duration_ms : null}
                                                key={key} 
                                                id={JSON.parse(item).id} 
                                                name={JSON.parse(item).name} 
                                                accordion={'#accordion-favorites'} />
                                    )) : "No Favorite Tracks Yet." */}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
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

FavoritesComponent = connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);

const propTypes = {
  tracks: PropTypes.object
};

FavoritesComponent.propTypes = propTypes;

export default FavoritesComponent;
