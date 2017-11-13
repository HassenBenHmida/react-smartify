import React, { Component } from 'react';
import {getAlbumsByArtist, search} from '../lib/SpotifyUtil';
import TrackComponent from './TrackComponent';
import { Route, Switch } from 'react-router-dom';
class AlbumComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
          items:undefined,
          selectedAlbum:undefined
        }

        this.getAlbumsList()
    }

    doSearch() {
        if(this.props.match.params.search_text){
            search(this.props.match.params.search_text, 'album').then(
                json => {
                this.setState({items: json.albums.items})
            })
        }
    }

    getAlbumsList(){
        //Search for albums
        if(this.props.match.params.art_id){
            getAlbumsByArtist(this.props.match.params.art_id).then(
                json => {
                    this.setState({items: json.items})
                })
        }else{
            this.doSearch()
        }
    }

    handleRouter(album_id){
        if(this.props.history.location.pathname.includes('artist')){
            this.props.history.push('/search/artist/' + this.props.match.params.search_text +'/'+ this.props.match.params.art_id + '/' +album_id)
        }else{
            this.props.history.push('/search/album/' + this.props.match.params.search_text +'/'+album_id)
        }
    } 

    albumCard(album, dataparent, aria_expanded = false){
        return (
            <div className="card" key={album.id}>
                <div className="card-header" role="tab" id={("card-header" + album.id.toString()).replace(/ /g,'')}>
                    <h5 className="mb-0">
                        <a data-toggle="collapse" aria-expanded={aria_expanded} href={"#tabpanel-" + album.id.toString()} onClick={(e) => this.handleRouter(album.id)} aria-controls={"tabpanel-" + album.id.toString()}>
                        {album.name}
                        </a>
                    </h5>
                </div>

                <div id={"tabpanel-" + album.id.toString()} className={(aria_expanded === true) ? 'collapse show' : "collapse"} role="tabpanel" aria-labelledby={("card-header-" + album.id.toString()).replace(/ /g,'')} data-parent={dataparent}>
                    <div className="card-body">

                        <div className="card">
                            {(album.imageOfThis) ? <img className="card-img-top" src={album.imageOfThis} alt={"Image : " + album.name} /> : null}
                            <div className="card-body">
                                <h4 className="card-title">{album.name}</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href={album.href} className="btn btn-primary">Link</a>
                            </div>
                            <br />
                            
                            {
                                (this.state.selectedAlbum === album.id || this.props.match.params.alb_id === album.id) ? //without this test all the track accordians will receive the same id (album id in the path) which generate an error => only the first track accordian can be opened 
                                    <Switch>
                                        <Route path='/search/artist/:search_text/:art_id?/:alb_id?/:tra_id?/' component={TrackComponent}/>
                                        <Route path='/search/album/:search_text/:alb_id?/:tra_id?/' component={TrackComponent}/>
                                    </Switch>
                                : 
                                    <div id="spinner" className="text-center">
                                        <i className="fa fa-spinner fa-spin"></i>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        let accordian_id = (this.props.match.params.alb_id) ? "accordion-album-"+this.props.match.params.alb_id : "accordion-album"
        return (
                <div className="col-sm-12">
                    <div id={accordian_id} role="tablist">
                        <div className="alert alert-secondary" role="alert">
                            Album List
                        </div>
                        {
                            (this.state.items) ?
                                this.state.items.map((item) => (
                                    this.albumCard(item, "#"+accordian_id, this.props.match.params.alb_id === item.id)
                                ))
                            :
                                <div id="spinner" className="text-center">
                                    <i className="fa fa-spinner fa-spin"></i>
                                </div>
                        }
                    </div>
                </div>
        )
    }

}

export default AlbumComponent;
