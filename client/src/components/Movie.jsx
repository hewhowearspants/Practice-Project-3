import React, { Component } from 'react';

import axios from 'axios';
import CommentAddForm from './CommentAddForm';

class Movie extends Component{
  constructor(props){
    super(props);
    this.state={
      commentData:null,
    }
    this.updatePage=this.updatePage.bind(this);
  }

  componentWillMount(){
    axios.get(`/movies/comments/${this.props.movie.id}`)
    .then((res)=>{
        let comments=res.data.data.map((comment)=>{
          if(res.data.data.length>0){
            return <p className='single-comment' key={comment.id}>{comment.user_name}: "{comment.text}"</p>
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
          }
        })
        this.setState({
          commentData:comments
        })
    })
    .catch(err=>console.log(err));
  }

  render() {
    return (
      <div className='movie'>
        <h3>{this.props.movie.title}</h3>
        <p>{this.props.movie.description}</p>
        <p>Genre: {this.props.movie.genre}</p>
        <span className='edit' onClick={() => this.props.selectEditedMovie(this.props.movie.id)}>Edit</span>
        <h5>Comments:</h5>
        <CommentAddForm commentData={this.state.commentData} movie={this.props.movie} updatePage={this.updatePage}/>
        <div className='comment-list'>
          {this.state.commentData}
        </div>
      </div>
    )
  }
}


export default Movie;