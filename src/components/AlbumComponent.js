import React, { Component } from 'react';
import {getSongsByAlbum} from '../lib/SpotifyUtil';
import TrackComponent from './TrackComponent';
import { Route } from 'react-router-dom';
class AlbumComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
          tracks_result:undefined,
          album_id:undefined,
          album_name:undefined
        }

        this.albumsNames = this.albumsNames.bind(this)
    }

    routerHandler(album_id){
        let path = this.props.location.pathname
        var n = path.lastIndexOf('/alb_id/')
        if(n > -1){
            let result = path.substring(0, n)
            this.props.history.push(result+"/alb_id/"+album_id)
        }else{
            this.props.history.push(path+"/alb_id/"+album_id)
        }
    }

    getTracksList(album_id, album_name, event){
        this.routerHandler(album_id)
        this.setState({tracks_result: undefined})
        this.setState({album_id: album_id})
        this.setState({album_name: album_name})
        getSongsByAlbum(album_id).then(
            json => {
                this.setState({tracks_result: json.tracks.items})
            })
    }

    albumsNames(albums, artist_id = 'noSpecificArtist'){
        return (
            <div key={artist_id.toString()} id={'accordianAlbum-Of' + artist_id.toString()} role="tablist">
                <div className="alert alert-secondary" role="alert">
                    Albums List
                </div>
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

                            <div id={"tabpanel-" + album.id.toString()} className="collapse" role="tabpanel" aria-labelledby={("card-header-" + album.id.toString()).replace(/ /g,'')} data-parent={'#accordianAlbum-Of' + artist_id.toString()}>
                                <div className="card-body">
                                    {
                                        (album.id === this.state.album_id && this.state.tracks_result) ? 
                                            <Route path='/search/:search_type/:search_text' render={(props) => (
                                                <TrackComponent {...props} 
                                                    tracks={(this.state.tracks_result) ? JSON.stringify(this.state.tracks_result) : null} 
                                                    album_id = {(this.state.album_id) ? this.state.album_id : null}
                                                    album_name = {(this.state.album_name) ? this.state.album_name : null} 
                                                    artist_id = {artist_id} />
                                            )}/> :
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

    render(){
        if(this.props.albums){
            let albums = this.props.albums
            
            if(typeof this.props.albums === 'string'){
                albums = JSON.parse(this.props.albums)  
            }
            
            return (
                
                    <div className="col-sm-12">
                        {this.albumsNames(albums, this.props.artist_id)}
                    </div>
                )
        }

        return (
            <div id="spinner" className="text-center">
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        )
    }

}

export default AlbumComponent;
