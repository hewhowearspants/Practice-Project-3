<<<<<<< HEAD

import React, { Component } from 'react';

import axios from 'axios';
import CommentAddForm from './CommentAddForm';

class Movie extends Component{
  constructor(props){
    super(props);
    this.state={
      commentData:null,
      commentExpand:'collapse',
    }
    this.updatePage=this.updatePage.bind(this);
    this.expandForm=this.expandForm.bind(this);
  }

  componentWillMount(){
    axios.get(`/movies/comments/${this.props.movie.id}`)
    .then((res)=>{
        let comments=res.data.data.map((comment)=>{
          if(res.data.data.length>0){
            return <p className='single-comment' key={comment.id}>{comment.user_name}: "{comment.text}"</p>
          }else{
            return
          }
        })
        this.setState({
          commentData:comments
        })
    })
    .catch(err=>console.log(err));
  }

  updatePage(){
    axios.get(`/movies/comments/${this.props.movie.id}`)
    .then((res)=>{
        let comments=res.data.data.map((comment)=>{
          if(res.data.data.length>0){
            return <p className='single-comment' key={comment.id}>{comment.user_name}: "{comment.text}"</p>
          }else{
            return
          }
        })
        this.setState({
          commentData:comments
        })
    })
    .catch(err=>console.log(err));
  }

  expandForm(){
    if(this.state.commentExpand==='expand'){
      this.setState({
        commentExpand:'collapse',
      })
    }else if(this.state.commentExpand==='collapse'){
      this.setState({
        commentExpand:'expand',
      })
    }
  }

  render() {
    return (
      <div className='movie'>
      <div className={`my-movie ${props.movieId === props.movie.id ? 'movieId' : ''}`}>
        <i onClick={() => props.favMovie(props.movie.id)} className="fa fa-star fa-2x" />
      </div>
        <h3>{this.props.movie.title}</h3>
        <p>{this.props.movie.description}</p>
        <p>Genre: {this.props.movie.genre}</p>
        {this.props.auth ? <span className='edit' onClick={() => this.props.selectEditedMovie(this.props.movie.id)}>Edit</span> : '' }
        <span className='edit' onClick={this.expandForm}>See Comments</span>
        <div className={`comment-box ${this.state.commentExpand}`}>
          {this.props.auth ?
            <CommentAddForm commentData={this.state.commentData} movie={this.props.movie} updatePage={this.updatePage}/>
          : '' }
          <div className='comment-list'>
            {this.state.commentData}
          </div>
        </div>
      </div>
    )
  }
}

export default Movie;
