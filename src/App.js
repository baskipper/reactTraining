import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {};

    this.loadPokemon = this.loadPokemon.bind(this);
  }

  loadPokemon(url){
    fetch(url)
    .then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
    }).catch(err =>{
      console.log(err);
    });
  }


  componentWillMount(){
    this.loadPokemon(`${this.props.baseUrl}/pokemon/`)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
