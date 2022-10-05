import React, { Component,useState }  from 'react';
import axios from 'axios';


export default class Form extends Component {
    constructor () {
      super();
      this.state = {
        email: '',
        password: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.url = "" //update url
    }
  
    handleChange (evt) {
      this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit = event => {
        const paper = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(`${this.url}/papers`, {paper})
            .then(res => {
                console.log(res);
                console.log(res.data);
                window.location = "/retrieve" //redirect once submission succeds
            })
        alert('Submission State: ' + JSON.stringify(this.state, null , 4));
        event.preventDefault();
    }
  
    render () {
      return (
        <form onSubmit={this.handleSubmit}>
  
          <label>Email</label>
          <input type="text" name="email" onChange={this.handleChange} />
  
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange} />

          <input type="submit" value="Submit"></input> 
        </form>
      );
    }
  }