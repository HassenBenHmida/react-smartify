import React, { Component } from 'react';

class TrackComponent extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        if(this.props.tracksFromAlbum){ 
            return (
                <div>Songs list</div>
            );
        }else{
            return (
                <div>The old list</div>
            );
        }
    }
}


export default TrackComponent;