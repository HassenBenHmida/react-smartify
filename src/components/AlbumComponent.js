import React, { Component } from 'react';
import {getSongsByAlbum} from '../lib/SpotifyUtil';
import TrackComponent from './TrackComponent';
class AlbumComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
          tracks_result:undefined,
          album_id:undefined,
          album_name:undefined
        }
    }

    getTracksList(album_id, album_name, event){
        this.setState({tracks_result: undefined})
        this.setState({album_id: album_id})
        this.setState({album_name: album_name})
        getSongsByAlbum(album_id).then(
            json => {
                this.setState({tracks_result: json.tracks.items})
            })
    }

    AlbumsNames(albums, artist_id){
        if(!albums){
            return (
                <div>Result not found yet.</div>
            )
        }
        
        let accordian_id = "accordion-albums"
        let parent_id = "#accordion-albums"
        
        if(artist_id){
            return(
                <div key={"accordion-albumof"+artist_id.toString()} id={"accordion-albumof"+artist_id.toString()} role="tablist">
                    {
                    albums.map((album) => (
                            <div key={album.id.toString()} className="card">
                                <div className="card-header" role="tab" id={("card-header-" + album.id.toString()).replace(/ /g,'')}>
                                    <h5 className="mb-0">
                                        <a data-toggle="collapse" href={"#tabpanel-" + album.id.toString()} onClick={this.getTracksList.bind(this, album.id)} aria-controls={"tabpanel-" + album.id.toString()}>
                                        {album.name}
                                        </a>
                                    </h5>
                                </div>

                                <div id={"tabpanel-" + album.id.toString()} className="collapse" role="tabpanel" aria-labelledby={("card-header-" + album.id.toString()).replace(/ /g,'')} data-parent={"#accordion-albumof"+artist_id.toString()}>
                                    <div className="card-body">
                                        {
                                            (album.id === this.state.album_id && this.state.tracks_result) ? 
                                                <TrackComponent 
                                                tracks_result = {(this.state.tracks_result) ? this.state.tracks_result : null}
                                                album_id = {(this.state.album_id) ? this.state.album_id : null}
                                                album_name = {(this.state.album_name) ? this.state.album_name : null}
                                                artist_id = {artist_id} /> :
                                                <div id="spinner" className="text-center">
                                                    <i className="fa fa-spinner fa-spin"></i>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                    ))
                    }
                </div>
            )
        }
        //old
        /* if(artist_id) {
            return (
                <div className="container">
                    <div className="list-group">
                        {
                            albums.map(album => (
                                <div key={"album-" + album.id.toString()} >
                                    <button className="list-group-item list-group-item-action" onClick={this.getTracksList.bind(this, album.id, album.name)} data-toggle="modal" data-target={"#tracks_list"+artist_id.toString()}>
                                        {album.name}
                                    </button>
                                </div>
                            ))
                        }
                        {
                            <TrackComponent 
                                tracks_result = {(this.state.tracks_result) ? this.state.tracks_result : null}
                                album_id = {(this.state.album_id) ? this.state.album_id : null}
                                album_name = {(this.state.album_name) ? this.state.album_name : null}
                                artist_id = {artist_id} /> 
                        }
                    </div>
                </div>
            )
        } */

        return (
            <div className="container">
                <div id={accordian_id} role="tablist">
                    {
                        albums.map(album => (
                            <div key={"album-" + album.id} className="card">
                                <div className="card-header" role="tab" id={("card-header-" + album.id.toString()).replace(/ /g,'')}>
                                    <h5 className="mb-0">
                                        <a data-toggle="collapse" href={'#tabpanel-'+album.id.toString()} aria-controls={"tabpanel-" + album.id.toString()}>
                                            {album.name}
                                        </a>
                                    </h5>
                                </div>
                    
                                <div id={"tabpanel-" + album.id.toString()} className="collapse" role="tabpanel" aria-labelledby={("card-header-" + album.id.toString()).replace(/ /g,'')} data-parent={parent_id}>
                                    <div className="card-body">
                                        {album.name}
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
            
                <div className="card-body">
                    <h3 className="card-title">Albums Names</h3>
                </div>
                
                {this.AlbumsNames(albumsFromArtist, artist_id)}
                
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
