import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokeList from './components/PokeList';
import SelectItemsPerPageButtons from './components/SelectItemsPerPageButtons';
import PokemonIndexList from './components/PokemonIndexList';
import PokemonModal from './components/PokemonModal';
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
      count: 0,
      loaded: false,
      showModal: false
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
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
        count: json.count,
        loaded: true
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

handleModalOpen() {
  this.setState({
    showModal: true
  });
}
handleModalClose() {
  this.setState({
    showModal: false
  });
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pokemon Dashboardb</h1>
        </header>
        {this.state.loaded ? null : "Loading..."}
        <PokemonIndexList
        display={this.state.loaded}
        options={[10,50,100,200]}
         selectedValue={this.state.limit}
        allValue={this.state.count}
        onOptionSelected={this.handleLimitChange}
      listOfPokemon={this.state.pokemon}
      onSelect={this.handlePaginationSelect}
      items={this.state.totalPages}
       bsSize="small"
       activePage={this.state.activePage}
       totalPages={this.state.totalPages} />

       <PokemonModal openModal={this.handleModalOpen} closeModal={this.handleModalClose} showModal={this.state.showModal} />
       </div>
    );
  }
}

export default App;
