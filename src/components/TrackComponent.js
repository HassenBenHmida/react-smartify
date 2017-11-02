import React, { Component } from 'react';

class TrackComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    routerHandler(track_id){
        let path = this.props.location.pathname
        var n = path.lastIndexOf('/tra_id/')
        if(n > -1){
            let result = path.substring(0, n)
            this.props.history.push(result+"/tra_id/"+track_id)
        }else{
            this.props.history.push(path+"/tra_id/"+track_id)
        }
    }

    tracksNames(tracks, album_id = "NoSpecificAlbum"){
        return (
            <div key={album_id.toString()} id={'accordianTrack-Of' + album_id.toString()} role="tablist">
                <div className="alert alert-secondary" role="alert">
                    Tracks List
                </div>
                {
                    tracks.map((track) => (
                        <div key={track.id.toString()} className="card">
                            <div className="card-header" role="tab" id={("card-header-" + track.id.toString()).replace(/ /g,'')}>
                                <h5 className="mb-0">
                                    <a data-toggle="collapse" href={"#tabpanel-" + track.id.toString()} onClick={this.routerHandler.bind(this, track.id)} aria-controls={"tabpanel-" + track.id.toString()}>
                                    {track.name}
                                    </a>
                                </h5>
                            </div>

                            <div id={"tabpanel-" + track.id.toString()} className="collapse" role="tabpanel" aria-labelledby={("card-header-" + track.id.toString()).replace(/ /g,'')} data-parent={'#accordianTrack-Of' + album_id.toString()}>
                                <div className="card-body">
                                    {track.name}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    render(){
        if(this.props.tracks){
            let tracks = this.props.tracks
            
            if(typeof this.props.tracks === 'string'){
                tracks = JSON.parse(this.props.tracks)  
            }
            
            return (
                    <div className="col-sm-12">
                        {this.tracksNames(tracks, this.props.album_id)}
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


export default TrackComponent;