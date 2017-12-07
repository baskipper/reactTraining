import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokeList from './components/PokeList';
import SelectItemsPerPageButtons from './components/SelectItemsPerPageButtons';
import { Col, Pagination } from 'react-bootstrap/lib/';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      pokemon: [],
      activePage: 1,
      limit: 50,
      offset: 0,
      totalPages: 0,
      count: 0
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }

  loadPokemon(url){
    fetch(url)
    .then(response => {
      return response.json();
    }).then(json => {
      let pages = Math.round(json.count / this.state.limit);
      this.setState({
        pokemon: json.results,
        totalPages: pages,
        count: json.count
      });
      console.log(this.state);
    }).catch(err =>{
      console.log(err);
    });
  }


  componentWillMount(){
    this.loadPokemon(`${this.props.baseUrl}/pokemon/`);
  }

  handlePaginationSelect(event){
    console.log(event);
    let offset = this.state.limit * event;
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
    this.setState({
      activePage: event
    })
  }

  handleLimitChange(event){
    console.log(this.state.limit);
    console.log('event');
    console.log(event);
    console.log('event.target');
    console.log(event.target);
    console.log('event.target.innerHtml');
    console.log(event.target.innerHtml);
    this.setState({
      limit: +event.target.innerHTML || this.state.count,
      activePage: 1
    }, () =>{

      this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=0`);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SelectItemsPerPageButtons options={[10,50,100,200]} selectedValue={this.state.limit} allValue={this.state.count} onOptionSelected={this.handleLimitChange}/>
        <Col sm={8} md={10} smOffset={2} mdOffset={1}>
          <PokeList listOfPokemon={this.state.pokemon} />
        </Col>
        <Col sm={12}>
          <Pagination onSelect={this.handlePaginationSelect} items={this.state.totalPages} bsSize="small" activePage={this.state.activePage} />
        </Col>
      </div>
    );
  }
}

export default App;
