import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import MoviesList from './components/MoviesList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
      currentPage: 'home',
      currentMovieId: null,
      movieData: null,
      movieDataLoaded: false,
      fireRedirect: false,
      movieId: null,
      favoritedMovies: [],
    }
    this.favMovie = this.favMovie.bind(this);
    this.unFavMovie = this.unFavMovie.bind(this);
    this.getUserFaves = this.getUserFaves.bind(this);
    this.setPage = this.setPage.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleMovieSubmit = this.handleMovieSubmit.bind(this);
    this.handleMovieEditSubmit = this.handleMovieEditSubmit.bind(this);
    this.selectEditedMovie = this.selectEditedMovie.bind(this);
  }

  componentDidMount() {
    axios.get('/movies')
      .then((res) => {
        console.log(res.data)
        this.setState({
          movieData: res.data,
          movieDataLoaded: true,
        });
      }).catch(err => console.log(err));

  }

  setPage(page){
    console.log('click');
    this.setState({
      currentPage: page,
    })
  }

  handleLoginSubmit(e, username, password) {
    e.preventDefault();
    axios.post('/auth/login', {
      username,
      password,
    }).then(res => {
      console.log(res.data.user);
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
        currentPage: 'home',
        fireRedirect: true,
      });
      this.getUserFaves(res.data.user.id);
    }).catch(err => console.log(err));
  }

  handleRegisterSubmit(e, username, password, email) {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
        currentPage: 'home',
        fireRedirect: true,
      });
    }).catch(err => console.log(err));
  }

  getUserFaves(userId) {
    console.log(userId)
    axios.get('/movies/fav', { params: {userId} })
      .then((res) => {
        console.log('favorites: ' + JSON.stringify(res.data[0]));
        const favoritedMovies = res.data.map(element => element.movie_id);
        const updatedMovies = [...this.state.movieData].map((movie) => {
          for(let i=0; i<favoritedMovies.length; i++) {
            if(movie.id === favoritedMovies[i]) {
              movie.isFavorited = true;
              return movie;
            } else {
              movie.isFavorited = false;
            };
          };
          return movie;
        });
        console.log(updatedMovies);
        this.setState({
          favoritedMovies: favoritedMovies,
          movieData: updatedMovies,
        })
      }).catch((err) => {
        console.log(err);
      })
      
  }

  logOut() {
    axios.get('/auth/logout')
      .then(res => {
        console.log(res);
        this.setState({
          auth: false,
          currentPage: 'home',
        });
      }).catch(err => console.log(err));
  }

  handleMovieSubmit(event, title, description, genre) {
    event.preventDefault();
    axios.post('/movies', {
      title,
      description,
      genre,
    }).then((res) => {
      this.resetMovies();
    }).then(() => {
      this.setState({
        fireRedirect: true,
      })
    }).catch((err) => { console.log(err) });
  }

  handleMovieEditSubmit(event, title, description, genre) {
    event.preventDefault();
    axios.put(`/movies/${this.state.currentMovieId}`, {
      title,
      description,
      genre,
    }).then((res) => {
      this.resetMovies();
    }).then(() => {
      this.setState({
        fireRedirect: true,
      })
    }).catch((err) => { console.log(err) });
  }


  selectEditedMovie(id) {
    this.setState({
      currentMovieId: id,
    })
  }

  resetMovies() {
    axios.get('/movies')
      .then((res) => {
        this.setState({
          movieData: res.data,
          currentMovieId: null,
        })
      }).catch((err) => { console.log(err) });
  }

  favoritesHandler(movieId, userId) {
    console.log(this.state.movieData)
    const updatedMovies = [...this.state.movieData];
    updatedMovies.find((movie) => { return movie.id === movieId })
  }

  favMovie(movieId, userId) {
    console.log(movieId, userId);
    axios.post(`/movies/${movieId}/fav`, {
        userId,
      }).then((res) => {
        console.log('fav\'d!');
        this.getUserFaves(userId);
      }).catch((err) => { console.log(err) });
  }

  unFavMovie(movieId, userId) {
    console.log('deleting! ' + movieId + ' ' + userId);
    axios.delete(`/movies/${movieId}/fav`, {
        params: { userId, }
      }).then(() => {
        console.log('un-fav\'d');
        this.getUserFaves(userId);
      }).catch((err) => {
        console.log(err);
      });
  }


  render() {
    return (
      <Router>
      <div className="App">
        <Header setPage={this.setPage} auth={this.state.auth} logOut={this.logOut} />
        <main>
          <Route exact path='/' component={ Home } />
          <Route exact path='/login' render={() => <Login handleLoginSubmit={this.handleLoginSubmit} />} />
          <Route exact path='/register' render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit} />} />
          <Route exact path='/movies' render={() => {
              if (this.state.movieDataLoaded) {
                return (
                  <MoviesList
                  movieData={this.state.movieData}
                  handleMovieSubmit={this.handleMovieSubmit}
                  handleMovieEditSubmit={this.handleMovieEditSubmit}
                  selectEditedMovie={this.selectEditedMovie}
                  currentMovieId={this.state.currentMovieId}
                  auth={this.state.auth}
                  user={this.state.user}
                  movieId={this.state.movieId}
                  favMovie={this.favMovie}
                  unFavMovie={this.unFavMovie} />
                )
              } else return <h1>Loading</h1>
            }
          }/>
          {this.state.fireRedirect ? <Redirect push to={'/movies'} /> : '' }
        {/* {this.decideWhichPage()} */}
        </main>
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
