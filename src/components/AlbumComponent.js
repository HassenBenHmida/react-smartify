import React, { Component } from 'react';

class AlbumComponent extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return (
            <div id="accordion" role="tablist">
            {
                this.props.albums.map(album => (
                    <div key={album.id} className="card">
                      <div className="card-header" role="tab" id={(album.name + album.id).replace(/ /g,'')}>
                        <h5 className="mb-0">
                          <a data-toggle="collapse" href={'#'+album.id} aria-controls={album.id}>
                            {album.name}
                          </a>
                        </h5>
                      </div>

                      <div id={album.id} className="collapse" role="tabpanel" aria-labelledby={(album.name + album.id).replace(/ /g,'')} data-parent="#accordion">
                        <div className="card-body">
                          {album.name}
                        </div>
                      </div>
                    </div>
                  ))
            }
            </div>  
        );
    }

}

export default AlbumComponent;
