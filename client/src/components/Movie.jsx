import React from 'react';

const Movie = (props) => {
  return (
    <div className='movie'>
      <h3>{props.movie.title}</h3>
      <p>{props.movie.description}</p>
      <p>Genre: {props.movie.genre}</p>
      {props.auth ? <span className='edit' onClick={() => props.selectEditedMovie(props.movie.id)}>Edit</span> : '' }
      </div>
  )
}

export default Movie;
