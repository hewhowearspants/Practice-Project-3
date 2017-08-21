import React, { Component } from 'react';

import axios from 'axios';

class CommentAddForm extends Component{
    constructor(){
        super();
        this.state={
            text:'',
        }
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleCommentSubmit=this.handleCommentSubmit.bind(this);
    }

    handleInputChange(event){
        this.setState({
            text:event.target.value,
        })
    }

    handleCommentSubmit(event){
        event.preventDefault();
        axios.post(`/movies/comments/${this.props.movie.id}`,{
        text:this.state.text,
        },this.props.movie.id)
        .then(this.props.updatePage)
        .catch((err)=>{console.log(err)});
    }


    render(){
        return(
            <form className='comment-submit' onSubmit={(event)=>this.handleCommentSubmit(event,this.state.text)}>
                <textarea className='comment-text' type='text' value={this.state.text} onChange={this.handleInputChange}/>
                <input className='comment-btn' type='submit' />
            </form>
        )
    }
}

export default CommentAddForm;