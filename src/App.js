import React, { Component } from 'react';
import './App.css';
import MenuButton from './components/MenuButton.js';
import Credentials from './FSQCredentials'
import MapMenuContainer from './components/MapMenuContainer.js';
import 'whatwg-fetch';

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
        info: '',
        locations: {},
        latlong: "",
      };
  }

  componentDidMount() {

    this.getLocation();

    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    const params = {
      client_id: "SNZTLCEBVGHWN1B0VB4J0GGCG5VE541QNOS54LHOXNX22H4Z", //Client ID obtained by getting developer access
      client_secret: "PXL0DTUC3OO4YBZ3VDLMJW4ODFAKTFVTGEOWM3CISX0FFHK5", //Client Secret obtained by getting developer access
      limit: 20, //The max number of venues to load
      query: 'Night Clubs', //The type of venues we want to query
      v: '20130619', //The version of the API.
      ll: '51.509865,-0.118092' //The latitude and longitude of Charing Cross, London
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json()).then(response => {
      const locations = response.response.groups[0].items.map(item => {
      return {
        position: { lat: item.venue.location.lat, lng: item.venue.location.lng },
        title: item.venue.name,
        id: item.venue.id,
        category: item.venue.categories[0].name,
        address: item.venue.location.address,
        state: item.venue.location.state,
        coordinates: item.venue.location.lat + ', ' + item.venue.location.lng,
      }
    })

    this.setState({ locations })
  })
  //If the api fails to load
  .catch(err => {
    console.log('Failed to fetch foursquare data', err)
  })
}


  getLocation = () => {
    navigator.geolocation.getCurrentPosition(response => {
      this.setState({
        latlong: response.coords.latitude + "," + response.coords.longitude
      });
    });
  };

  render() {
    return (
      <div className="App">
        <header>
                  <h1 id="title">London Clubs</h1>
                  <MenuButton/>
        </header>
                  <MapMenuContainer locations={this.state.locations}/>
      </div>
    );
  }
}

export default App
