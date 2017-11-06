import React, { Component } from 'react';
import {getAlbumsByArtist} from '../lib/SpotifyUtil';
import AlbumComponent from './AlbumComponent';
//import { Route } from 'react-router-dom';
class ArtistComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            albums_result:undefined
        }

        this.albumAccordion = this.albumAccordion.bind(this)
        this.getAlbumsList = this.getAlbumsList.bind(this)
        this.routeHandler = this.routeHandler.bind(this)
    }

    routeHandler(keepRoute){
        //The user click on an artist item
        //The route will change
        this.props.match.params.art_id = this.props.id
        let search_text = this.props.match.params.search_text
        let search_type = this.props.match.params.search_type
        let alb_id = (this.props.match.params.alb_id && keepRoute) ? this.props.match.params.alb_id+"/" : ""
        let tra_id = (this.props.match.params.tra_id && keepRoute) ? this.props.match.params.tra_id+"/" : ""
        this.props.history.push("/search/"+search_type+"/"+search_text+"/"+this.props.id+"/"+alb_id+tra_id)
    }

    componentDidMount(){
        if(this.props.aria_expanded){
            this.getAlbumsList()
            this.routeHandler(true)
        }
    }

    getAlbumsList(){
        //Get all albums of this artist
        this.setState({albums_result: undefined})
        getAlbumsByArtist(this.props.id).then(
            json => {
                this.setState({albums_result: json.items})
            })
    }

    openArtistAccordian(){
        this.getAlbumsList()
        this.routeHandler(false)
    }

    albumAccordion(){
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div id={"accordion-album-"+this.props.id} role="tablist">
                        <div className="alert alert-secondary" role="alert">
                            Album List
                        </div>
                        {
                        this.state.albums_result.map((item, key) => (
                            <AlbumComponent  {...this.props} 
                                            aria_expanded={this.props.match.params.alb_id === item.id ? true : false}
                                            images={(item.images) ? item.images : null}
                                            href={(item.href) ? item.href : null}
                                            key={key} 
                                            id={item.id} 
                                            name={item.name} 
                                            accordion={'#accordion-album-'+this.props.id} />
                        ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className="card">
                <div className="card-header" role="tab" id={("card-header" + this.props.id.toString()).replace(/ /g,'')}>
                    <h5 className="mb-0">
                        <a data-toggle="collapse" aria-expanded={this.props.aria_expanded} href={"#tabpanel-" + this.props.id.toString()} onClick={this.openArtistAccordian.bind(this)} aria-controls={"tabpanel-" + this.props.id.toString()}>
                        {this.props.name}
                        </a>
                    </h5>
                </div>

                <div id={"tabpanel-" + this.props.id.toString()} className={(this.props.aria_expanded === true) ? 'collapse show' : "collapse"} role="tabpanel" aria-labelledby={("card-header-" + this.props.id.toString()).replace(/ /g,'')} data-parent={this.props.accordion}>
                    <div className="card-body">

                        <div className="card">
                            {(this.props.imageOfThis) ? <img className="card-img-top" src={this.props.imageOfThis} alt={"Image : " + this.props.name} /> : null}
                            <div className="card-body">
                                <h4 className="card-title">{this.props.name}</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href={this.props.href} className="btn btn-primary">Link</a>
                            </div>
                            <br />

                            {
                                (this.state.albums_result) ? 
                                    this.albumAccordion()
                                    : 
                                    <div id="spinner" className="text-center">
                                        <i className="fa fa-spinner fa-spin"></i>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ArtistComponent;