import React, { Component } from 'react';

class MovieAddForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      genre: '',
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
      <div className='add'>
        <form onSubmit={(event) => this.props.handleMovieSubmit(event, this.state.title, this.state.description, this.state.genre)}>
        <div className='add-input'>
          <label> TITLE
            <input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.handleInputChange} />
          </label>
          <label> DESCRIPTION
            <input type='text' name='description' placeholder='Description' value={this.state.description} onChange={this.handleInputChange} />
          </label>
          <label> GENRE
            <input type='text' name='genre' placeholder='Genre' value={this.state.genre} onChange={this.handleInputChange} />
          </label>
          <input type='submit' value='Add Movie' />
          </div>
        </form>
      </div>
    )
  }
}

export default MovieAddForm;
