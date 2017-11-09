import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addFavorite, removeFavorite } from '../actions'

class TrackComponent extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    routeHandler(){
        if(this.props.match){//show error without this condition in FavoritesComponent
            this.props.match.params.tra_id = this.props.id
            let search_text = this.props.match.params.search_text
            let search_type = this.props.match.params.search_type
            let art_id = (search_type === "artist") ? this.props.match.params.art_id+"/" : ""
            let alb_id = (search_type === "track") ? "" : this.props.match.params.alb_id+"/"
            this.props.history.push("/search/"+search_type+"/"+search_text+"/"+art_id+alb_id+this.props.id+"/")
        }
    }


    render(){
        //console.log(this.props.object)
                
        return (
            <div className="card">
                <div className="card-header" role="tab" id={("card-header" + this.props.id.toString()).replace(/ /g,'')}>
                    <h5 className="mb-0">
                        <a data-toggle="collapse" aria-expanded={this.props.aria_expanded} href={"#tabpanel-" + this.props.id.toString()} onClick={this.routeHandler.bind(this)} aria-controls={"tabpanel-" + this.props.id.toString()}>
                        {this.props.name}
                        </a>
                    </h5>
                </div>

                <div id={"tabpanel-" + this.props.id.toString()} className={(this.props.aria_expanded ===true) ? 'collapse show' : "collapse"} role="tabpanel" aria-labelledby={("card-header-" + this.props.id.toString()).replace(/ /g,'')} data-parent={this.props.accordion}>
                    <div className="card-body">

                        {/* Track Card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="float-sm-right">
                                    {
                                        <button onClick={() => (this.props.tracks.indexOf(this.props.object) > -1) ? this.props.removeFavorite(this.props.object) : this.props.addFavorite(this.props.object)}>
                                            <i className={(this.props.tracks.indexOf(this.props.object) > -1) ? "fa fa-heart" : "fa fa-heart-o"}></i>
                                        </button>
                                    }
                                </div>
                                <h4 className="card-title">{this.props.name}</h4>
                                {(this.props.duration_ms) ? <h6 className="card-subtitle mb-2 text-muted">Duration : {~~(this.props.duration_ms/1000)}s</h6> : null}
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href={this.props.href} className="btn btn-primary">Link</a>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({  
    tracks: state.tracksReducerHandler,
});
  
const mapDispatchToProps = {  
    addFavorite,
    removeFavorite,
};
  
TrackComponent = connect(  
    mapStateToProps,
    mapDispatchToProps
)(TrackComponent);

export default TrackComponent;