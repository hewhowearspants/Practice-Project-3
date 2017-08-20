import React, { Component } from 'react';

class MovieEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.movie.title,
      description: this.props.movie.description,
      genre: this.props.movie.genre,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className='edit'>
        <form onSubmit={(event) => this.props.handleMovieEditSubmit(event, this.state.title, this.state.description, this.state.genre)}>
          <label> TITLE
            <input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.handleInputChange} />
          </label>
          <label> DESCRIPTION
            <input type='text' name='description' placeholder='Description' value={this.state.description} onChange={this.handleInputChange} />
          </label>
          <label> GENRE
            <input type='text' name='genre' placeholder='Genre' value={this.state.genre} onChange={this.handleInputChange} />
          </label>
          <input type='submit' value='Edit Movie' />
        </form>
      </div>
    )
  }
}

export default MovieEditForm;
