import React, { Component } from 'react';

class TrackComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div id="accordion" role="tablist">
            {
                this.props.tracks.map(track => (
                    <div key={track.id} className="card">
                    <div className="card-header" role="tab" id={(track.name + track.id).replace(/ /g,'')}>
                        <h5 className="mb-0">
                        <a data-toggle="collapse" href={'#'+track.id} aria-controls={track.id}>
                            {track.name}
                        </a>
                        </h5>
                    </div>

                    <div id={track.id} className="collapse" role="tabpanel" aria-labelledby={(track.name + track.id).replace(/ /g,'')} data-parent="#accordion">
                        <div className="card-body">
                        {track.name}
                        </div>
                    </div>
                    </div>
                ))
            }
            </div>
        );
    }
}


export default TrackComponent;