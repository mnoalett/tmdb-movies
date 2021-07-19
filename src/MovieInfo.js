import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query, graphql } from 'react-apollo'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }
      
    render(){
        console.log(this.props);
        const id = this.props.movie;
        const show = this.props.show
        console.log(id)
        return (
            <Query query={query} variables={{id}} >
            {
                (({loading, err, data}) => {
                    if(loading) return <div>loading</div>
                    console.log("ready");
                    return (
                        <Modal show={show} onHide={this.props.onHide}>
                            <Modal.Header closeButton>
                            <Modal.Title>{data !== undefined ? data.movies.movie.title : ''}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{data !== undefined ? data.movies.movie.overview : ''}</Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>
                    )
                })
            }
            </Query>
        )
    }
}
const query = gql`

query MovieInfo($id: String){
    movies {
      movie(id: $id){
        title,
        overview
      }
    }
}

`;

export default graphql(query)(MovieInfo);