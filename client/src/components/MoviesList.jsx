import React, { Component } from 'react';

import Movie from './Movie';
import MovieAddForm from './MovieAddForm';
import MovieEditForm from './MovieEditForm';

class MoviesList extends Component {
  render() {
    return (
      <div className="movies-container">
        {this.props.auth ? <MovieAddForm handleMovieSubmit={this.props.handleMovieSubmit} />  : '' }
        <div className='movies-list'>
          {this.props.movieData.map((movie) => {
            if (this.props.currentMovieId === movie.id) {
              return <MovieEditForm key={movie.id} movie={movie} handleMovieEditSubmit={this.props.handleMovieEditSubmit} />
            } else return <Movie favMovie={this.props.favMovie} userId={this.props.userId} movieId={this.props.movieId} auth={this.props.auth} key={movie.id} movie={movie} selectEditedMovie={this.props.selectEditedMovie} />
          })}
        </div>
      </div>
    )
  }
}

export default MoviesList;
