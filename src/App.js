import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu.js';
import MapContainer from './components/MapContainer.js';

var foursquare = require('react-foursquare')({
  clientID: 'SNZTLCEBVGHWN1B0VB4J0GGCG5VE541QNOS54LHOXNX22H4Z',
  clientSecret: '2MJMFYCW21VYCA5GKPQGYACKKI00HT3KQX0ALWIMXMS2LH43'
});

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
        items: [],
        markers: [
            {
                lat: 51.519610,
                long: -0.102451,
                name: 'Fabric'
            },
            {
                lat: 51.497464,
                long: -0.044145,
                name: 'Printworks',
            },
            {
                lat: 51.497712,
                long: -0.099491,
                name: 'Ministry of Sound'
            },
            {
                lat: 51.493556,
                long: -0.098711,
                name: 'Corsica Studios'
            },
            {
                lat: 51.541721,
                long: -0.125187,
                name: 'Egg London'
            },
            {
                lat: 51.464495,
                long: -0.114498,
                name: 'Phonox'
            },
            {
                lat: 51.551698,
                long: -0.074799,
                name: 'The Nest'
            },
            {
                lat: 51.525477,
                long: -0.085594,
                name: 'XOYO'
            }
        ],
        virtualMarkers: []
      };

  }

  componentDidMount() {
    let params = {}
    this.state.markers.map(marker => {params = {
    ll: marker.lat+","+marker.long,
    query: marker.name}
  })
  foursquare.venues.getVenues(params)
    .then(res=> {
      this.setState({ items: res.response.venues });
    });
}

  render() {
    return (
      <div className="App">
        <header>
                  <Menu markers={this.state.markers}/>
                  <h1 id="title">London Clubs</h1>
        </header>
        <MapContainer
          items={this.state.items}
          markers={this.state.markers}
          openInfo={this.openMarker}
      />
      </div>
    );
  }
}

export default App
