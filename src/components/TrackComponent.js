import React, { Component } from 'react';

class TrackComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    TracksNames(tracks){
        return (tracks.map(track => (
            <li key={track.id}>{track.name}</li>
        )))
    }

    tracksList(tracks, album_id, album_name, artist_id){
        return (
            <div className="modal fade" id={"tracks_list" + artist_id.toString()} tabIndex="-1" role="dialog" aria-labelledby="aria" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="aria">{(album_name) ? album_name : null} Songs' list</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul>
                            {(tracks) ? this.TracksNames(tracks) : null}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    TracksNamesAccordian(tracks){
        return (
            <div className="container">
                <div id="tracks_accordian" role="tablist">
                    {
                        tracks.map(track => (
                            <div key={"album-" + track.id} className="card">
                                <div className="card-header" role="tab" id={("card-header-" + track.id.toString()).replace(/ /g,'')}>
                                    <h5 className="mb-0">
                                        <a data-toggle="collapse" href={'#tabpanel-'+track.id.toString()} aria-controls={"tabpanel-" + track.id.toString()}>
                                            {track.name}
                                        </a>
                                    </h5>
                                </div>
                    
                                <div id={"tabpanel-" + track.id.toString()} className="collapse" role="tabpanel" aria-labelledby={("card-header-" + track.id.toString()).replace(/ /g,'')} data-parent="#tracks_accordian">
                                    <div className="card-body">
                                        {track.name}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
    

    render(){
        if(this.props.tracks){ 
            return this.TracksNamesAccordian(this.props.tracks)
        }else{
            return (
                this.tracksList(this.props.tracks_result, this.props.album_id, this.props.album_name, this.props.artist_id)
            );
        }
    }
}


export default TrackComponent;