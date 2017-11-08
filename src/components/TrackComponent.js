import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addFavorite, removeFavorite } from '../actions/actions'

class TrackComponent extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
/*
    componentWillReceiveProps(){
        console.log(this.props.tracks)
        console.log(this.props.id)
        if(this.props.tracks && this.props.tracks.indexOf(this.props.id) > -1){
            this.setState({inFavorite:true})
        }else{
            this.setState({inFavorite:false})
        }
    }*/

    routeHandler(){
        this.props.match.params.tra_id = this.props.id
        let search_text = this.props.match.params.search_text
        let search_type = this.props.match.params.search_type
        let art_id = (search_type === "artist") ? this.props.match.params.art_id+"/" : ""
        let alb_id = (search_type === "track") ? "" : this.props.match.params.alb_id+"/"
        this.props.history.push("/search/"+search_type+"/"+search_text+"/"+art_id+alb_id+this.props.id+"/")
    }


    render(){
        //console.log(this.props)
                
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
                                        (this.props.tracks && this.props.tracks.indexOf(this.props.id) > -1) ?
                                            <button onClick={() => this.props.removeFavorite(this.props.id)}>
                                                <i className="fa fa-heart"></i>
                                            </button>
                                        :
                                            <button onClick={() => this.props.addFavorite(this.props.id)}>
                                                <i className="fa fa-heart-o"></i>
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
    tracks: state.smartifyApp,
});
  
const mapDispatchToProps = {  
    addFavorite,
    removeFavorite,
};
  
TrackComponent = connect(  
    mapStateToProps,
    mapDispatchToProps
)(TrackComponent);
/* TrackComponent = connect(
    state => state,
    dispatch => bindActionCreators({addFavorite, removeFavorite}, dispatch)
  )(TrackComponent) */
//TrackComponent = connect()(TrackComponent)
export default TrackComponent;