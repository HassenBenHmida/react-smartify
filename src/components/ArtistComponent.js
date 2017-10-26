import React, { Component } from 'react';
import {getAlbumsByArtist} from '../lib/SpotifyUtil';
import AlbumComponent from './AlbumComponent';

class ArtistComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            albums_result:undefined,
            artist_id:undefined
        }

        this.getAlbumsList = this.getAlbumsList.bind(this)
    }


    getAlbumsList(e, artist_id){
        if(artist_id !== this.state.artist_id){
            this.setState({albums_result: undefined})
            this.setState({artist_id: artist_id})
            getAlbumsByArtist(artist_id).then(
                json => {
                  this.setState({albums_result: json.items})
              })
        }
    }

    render(){
        return (
            <div className="col-sm-12">
                <div id="accordion-artist" role="tablist">
                {
                    this.props.artists.map(artist => (
                            <div key={artist.id.toString()} className="card">
                                <div className="card-header" role="tab" id={(artist.name + artist.id.toString()).replace(/ /g,'')}>
                                <h5 className="mb-0">
                                    <a data-toggle="collapse" href={'#'+artist.id.toString()} onClick={e => this.getAlbumsList(e, artist.id)} aria-controls={artist.id.toString()}>
                                    {artist.name}
                                    </a>
                                </h5>
                                </div>

                                <div id={artist.id.toString()} className="collapse" role="tabpanel" aria-labelledby={(artist.name + artist.id.toString()).replace(/ /g,'')} data-parent="#accordion-artist">
                                    <div className="card-body">
                                        {
                                            (this.state.albums_result && this.state.artist_id) ? <AlbumComponent albumsFromArtist={this.state.albums_result} artist_id={this.state.artist_id} /> : null
                                        }
                                    </div>
                                </div>
                            </div>  
                    ))
                }
                </div>
            </div>
        );
    }
}


export default ArtistComponent;