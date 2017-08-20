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
            <form onSubmit={(event)=>this.handleCommentSubmit(event,this.state.text)}>
                <input type='text' value={this.state.text} onChange={this.handleInputChange}/>
                <input type='submit' />
            </form>
        )
    }
}

export default CommentAddForm;