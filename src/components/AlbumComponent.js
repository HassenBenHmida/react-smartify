import React, { Component } from 'react';
import {getSongsByAlbum} from '../lib/SpotifyUtil';
// import TrackComponent from './TrackComponent';
class AlbumComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
          tracks_result:undefined
        }
    }

    getTracksList(e, album_id){
      this.setState({tracks_result: undefined})
      getSongsByAlbum(album_id).then(
          json => {
            this.setState({tracks_result: json.tracks.items})
        })
      e.preventDefault()
    }

    AlbumsNames(albumsFromArtist, artist_id){
        if(!albumsFromArtist){
            return (
                <div>Result not found yet</div>
            )
        }
        return (
            <div className="container">
                <div id={"accordion-albums-" +  artist_id.toString()} role="tablist">
                    {
                        albumsFromArtist.map(album => (
                        <div key={"album-" + album.id} className="card">
                            <div className="card-header" role="tab" id={(album.name + album.id.toString()).replace(/ /g,'')}>
                                <h5 className="mb-0">
                                    <a data-toggle="collapse" href={'#'+album.id.toString()} aria-controls={album.id.toString()}>
                                        {album.name}
                                    </a>
                                </h5>
                            </div>

                            <div id={album.id.toString()} className="collapse" role="tabpanel" aria-labelledby={(album.name + album.id.toString()).replace(/ /g,'')} data-parent={"#accordion-albums-" +  artist_id.toString()}>
                                <div className="card-body">
                                    test
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    AlbumCards(albumsFromArtist, artist_id){
        return(
            <div className="card">
                {/* <img className="card-img-top" src="" alt="title" /> */}
                <div className="card-body">
                    <h3 className="card-title">Albums Names</h3>
                </div>
                
                {this.AlbumsNames(albumsFromArtist, artist_id)}
                
                
                {/* <div className="card-body">
                    <button className="btn btn-primary">Tracks Names</button>
                </div> */}
            </div>
        )
    }

    render(){
        if(this.props.albumsFromArtist && this.props.artist_id){ 
          return this.AlbumCards(this.props.albumsFromArtist, this.props.artist_id)
        }else{
          return (
            (this.props.albums) ? this.AlbumsNames(this.props.albums) : null
          );
        }
    }

}

export default AlbumComponent;
