import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import StarRatings from 'react-star-ratings';
import {Container, Row, Col, Carousel}  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieInfo from './MovieInfo';

class NewMovies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalId: null,
      movie: {}
    };
  }

  modalClose = (e) => {
    this.setState({ showModal: false});
  };

Movies(){
  return (
    <Container>
      <Row style={{margin: 'auto', position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
      <Col xs={1}></Col>
      <Col xs={10}>
      <Carousel interval={null}>
        {this.props.data.movies.trending.edges.map(movie =>
          <Carousel.Item key={movie.node.id}>
            <img src={movie.node.backdrop} className="d-block w-100" alt="movie cover" onClick={(e) => this.setState({ showModal: true, movie: movie.node.id })} />
            <Carousel.Caption>
              <h3>{movie.node.title}</h3>
              <StarRatings
                rating={movie.node.rating}
                starRatedColor="blue"
                numberOfStars={10}
                name='rating'
              />
              <h3>{new Date(movie.node.releaseDate).toLocaleDateString('en-US')}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
      <MovieInfo
        show={this.state.showModal}
        onHide={this.modalClose}
        movie={this.state.movie}
      />
      </Col>
      <Col xs={1}></Col>
      </Row>
    </Container>
  );
}
render() {
  if (this.props.data.loading) return <div>loading</div>
  return this.Movies()
}
}

const query = gql`
{
    movies {
        trending  {
          edges {
            node {
              id,
              backdrop(size: W780),
              title,
              rating,
              releaseDate
            }
          }
        }
    }
}
`

export default graphql(query)(NewMovies);
