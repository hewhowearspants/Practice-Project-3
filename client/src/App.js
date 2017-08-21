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
    }
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

  favMovie(movieId, userId) {
    console.log(this.state.user);
    axios.post(`/movies/${movieId}/fav`, {
          movieId,
          userId,
        }).then((res) => {
          this.resetMovies();
        }).then(() => {
          this.setState({
            fireRedirect: true,
          })
        }).catch((err) => { console.log(err) });
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
