import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Table from './components/table'
import { v4 as uuid } from 'uuid';


class App extends Component {

  //state object contains properties for everything to store as state
  state = {
    data: [],
    session_id: uuid(),
  };



  render() {

    return (
      <div className="App">

        <div className='container' >
        <h1> UniGuide! </h1>
          <p> Visualising paper information </p>
        </div>

        <div className='container'>
          
          <Table />
        </div>
      </div>
    );
    }
  }

export default App;
