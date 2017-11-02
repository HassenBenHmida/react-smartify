import React, { Component } from 'react';
import {getAlbumsByArtist} from '../lib/SpotifyUtil';
import AlbumComponent from './AlbumComponent';
import { Route } from 'react-router-dom';
class ArtistComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            albums_result:undefined,
            artist_id:undefined
        }
    }

    routerHandler(artist_id){
        let path = this.props.location.pathname
        var n = path.lastIndexOf('/art_id/')
        if(n > -1){
            let result = path.substring(0, n)
            this.props.history.push(result+"/art_id/"+artist_id)
        }else{
            this.props.history.push(path+"/art_id/"+artist_id)
        }
    }

    getAlbumsList(artist_id, event){
        if(artist_id !== this.state.artist_id){
            this.routerHandler(artist_id)
            this.setState({albums_result: undefined})
            this.setState({artist_id: artist_id})
            getAlbumsByArtist(artist_id).then(
                json => {
                  this.setState({albums_result: json.items})
              })
        }
        /* e.preventDefault(); */
    }

    artistData(artist){
        return (
            <div key={artist.id.toString()} className="card">
                <div className="card-header" role="tab" id={("card-header-" + artist.id.toString()).replace(/ /g,'')}>
                    <h5 className="mb-0">
                        <a data-toggle="collapse" href={"#tabpanel-" + artist.id.toString()} onClick={this.getAlbumsList.bind(this, artist.id)} aria-controls={"tabpanel-" + artist.id.toString()}>
                        {artist.name}
                        </a>
                    </h5>
                </div>

                <div id={"tabpanel-" + artist.id.toString()} className="collapse" role="tabpanel" aria-labelledby={("card-header-" + artist.id.toString()).replace(/ /g,'')} data-parent="#accordion-artist">
                    <div className="card-body">
                        {
                            (this.state.artist_id === artist.id && this.state.albums_result) ? 
                                <Route path='/search/artist/:search_text' render={(props) => (
                                    <AlbumComponent {...props} albums={JSON.stringify(this.state.albums_result)} artist_id={artist.id} />
                                )}/>
                                : 
                                <div id="spinner" className="text-center">
                                    <i className="fa fa-spinner fa-spin"></i>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    render(){
        let artists = JSON.parse(this.props.artists)
        return (
            <div className="col-sm-12">
                <div id="accordion-artist" role="tablist">
                    <div className="alert alert-secondary" role="alert">
                        Artists List
                    </div>
                    {
                        artists.map(artist => (
                            this.artistData(artist)
                        ))
                    }
                </div>
            </div>
        );
    }
}


export default ArtistComponent;