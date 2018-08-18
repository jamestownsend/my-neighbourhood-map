import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MenuButton from './MenuButton.js';

class MapContainer extends Component {

  constructor() {
    super();

      this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          loctations: [],
      };
    }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMaker: marker,
      showingInfoWindow: true
    })
  }

  onMapClick = () => {
    this.setState({
      activeMaker: {},
      selectedPlace: {},
      showingInfoWindow: false
    })
  }

  updateQuery = (query) => {
      this.setState({ query: query.trim() })
    }


  render() {
    const { query } = this.state
    const { locations } = this.props
  // Search feature adapted from udacity show contacts application.
    let displayLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      displayLocations = locations.filter((location) => match.test(location.title))
    } else {
      displayLocations = locations
    }

    return (
      <div>
        <div>
          <MenuButton/>
        </div>
          <div className="menu-wrapper">
              <div className="form" role="form">
                  <input type="text"
                         aria-labelledby="filter" placeholder="Search..."
                         className="input" role="search"
                         onChange={(event) => this.updateQuery(event.target.value)}/>
              </div>
              <ul>
                  {displayLocations && displayLocations.length && displayLocations.map((location, i) =>
                      <li key={i}>
                          <a href="#"
                          onClick={this.onMarkerClick}
                          key={location.id}
                          position={{ lat: location.position.lat, lng: location.position.lng}}
                          title={location.title}
                          tabIndex="0" role="button">{location.title}</a>
                      </li>
                  )}
              </ul>
      </div>
      <div className="map-container">
        <Map
          role="application"
          onClick={this.onMapClick}
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 51.519610,
            lng: -0.102451
        }}>
        {displayLocations && displayLocations.length && displayLocations.map((location, i) =>{
          return (
            <Marker
              key={location.id}
              position={{ lat: location.position.lat, lng: location.position.lng}}
              animation={this.props.google.maps.Animation.Fo}
              title={location.title}
              onClick={this.onMarkerClick}
              address={location.address}
            />
          )
        })}
        <InfoWindow className="InfoWin" marker={this.state.activeMaker} visible={this.state.showingInfoWindow}>
          <body>
            <header>
              <h2>{this.state.selectedPlace.title}</h2>
            </header>
            <main>
              <ul>
                <li><span aria-labelledby="place-address">Address:  </span><span id="place-address">{!this.state.selectedPlace.address ? 'N/A' : this.state.selectedPlace.address}</span></li>
              </ul>
            </main>
          </body>
        </InfoWindow>
        </Map>
      </div>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCCot3DxWsR9HvFRpAHcr4VRs93InlV6gQ")
})(MapContainer)
