import React, { Component } from 'react';

class ArtistComponent extends Component {
    constructor(props){
        console.log(props.artists.artists)
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            
                <div id="accordion" role="tablist">
                {
                    this.props.artists.map(artist => (
                        <div key={artist.id} className="card">
                            <div className="card-header" role="tab" id={(artist.name + artist.id).replace(/ /g,'')}>
                            <h5 className="mb-0">
                                <a data-toggle="collapse" href={'#'+artist.id} aria-controls={artist.id}>
                                {artist.name}
                                </a>
                            </h5>
                            </div>

                            <div id={artist.id} className="collapse" role="tabpanel" aria-labelledby={(artist.name + artist.id).replace(/ /g,'')} data-parent="#accordion">
                            <div className="card-body">
                                {artist.name}
                            </div>
                            </div>
                        </div>
                    ))
                }
                </div>
        );
    }
}


export default ArtistComponent;