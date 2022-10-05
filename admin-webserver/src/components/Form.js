import React, { Component }  from 'react';
import axios from 'axios';


export default class Form extends Component {
    constructor () {
      super();
      this.state = {
        paper_code: '',
        year: '',
        title: '',
        points: '',
        teaching_period: '',
        subject: '',
        prereq_string: '',
        prereq_list: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.url = "https://ijo4298cse.execute-api.us-east-1.amazonaws.com" //update url
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
  
          <label>Paper Code</label>
          <input type="text" name="paper_code" onChange={this.handleChange} />
  
          <label>Year</label>
          <input type="text" name="year" onChange={this.handleChange} />

          <label>Title</label>
          <input type="text" name="title" onChange={this.handleChange} />

          <label>Points</label>
          <input type="text" name="points" onChange={this.handleChange} />

          <label>Teaching Period</label>
          <input type="text" name="teaching_period" onChange={this.handleChange} />

          <label>subject</label>
          <input type="text" name="subject" onChange={this.handleChange} />

          <label>Pre-Requistes </label>
          <input type="text" name="prereq_string" onChange={this.handleChange} />

          <label>Prerequsite list</label>
          <input type="text" name="prereq_list" onChange={this.handleChange} />
          <label>'</label>
          <input type="submit" value="Submit"></input> 
        </form>
      );
    }
  }