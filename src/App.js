import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu.js';
import MapContainer from './components/MapContainer.js';

class App extends Component {

    state = {
      markers: [
          {
              lat: 51.519946,
              long: -0.109537,
              name: 'Prufrock Coffee'
          },
          {
              lat: 51.509620,
              long: -0.126939,
              name: 'Notes',
          },
          {
              lat: 51.511060,
              long: -0.084289,
              name: 'The New Black'
          },
          {
              lat: 51.521918,
              long: -0.119791,
              name: 'Espresso Room'
          },
          {
              lat: 51.513619,
              long: -0.079086,
              name: 'The Association'
          },
          {
              lat: 51.519300,
              long: -0.140725,
              name: 'Attendant'
          },
          {
              lat: 51.512371,
              long: -0.127092,
              name: 'Coffee Island'
          }
      ]
    };

  render() {
    return (
      <div className="App">
        <header>
                  <Menu/>
                  <h1 id="title">London Clubs</h1>
        </header>
        <MapContainer markers={this.state.markers}/>
      </div>
    );
  }
}

export default App
