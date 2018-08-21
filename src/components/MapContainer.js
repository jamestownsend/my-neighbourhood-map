import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MenuButton from './MenuButton.js';
import PropTypes from 'prop-types'

class MapContainer extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired
}

state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    loctations: [],
};

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

gm_authFailure = () => {
    alert("Google maps failed to load")
  }


  render() {
    const { query } = this.props
    const { locations } = this.props
  // Search feature adapted from udacity show contacts application.
    let displayLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      displayLocations = locations.filter((location) => match.test(location.title))
    } else {
      displayLocations = locations
    }
    displayLocations.sort(sortBy('title'))

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
                         onChange={(event) => this.props.onSearch(event.target.value)}/>
              </div>
              <ul className="no-results-hide">
                {displayLocations.length === 0 &&
                  <span className="no-results">No Results</span>}
                  {displayLocations && displayLocations.length && displayLocations.map((location, i) =>
                      <li key={i}>
                          <a href="title-list-item#"
                          onClick={this.props.onItemClick}
                          key={location.id}
                          value={this.props.selectedLocation}
                          position={{ lat: location.position.lat, lng: location.position.lng}}
                          title={location.title}
                          aria-labelledby="location-name"
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
          onError={this.gm_authFailure}
          initialCenter={{
            lat: 51.519610,
            lng: -0.102451
        }}>
        {displayLocations && displayLocations.length && displayLocations.map((location, i) =>{
          return (
            <Marker
              key={location.id}
              position={{ lat: location.position.lat, lng: location.position.lng}}
              animation={this.props.google.maps.Animation.DROP}
              title={location.title}
              onClick={this.onMarkerClick}
              address={location.address}
            />
          )
        })}
        <InfoWindow className="InfoWin" marker={this.state.activeMaker} visible={this.state.showingInfoWindow}>
          <body className="InfoWin-body">
            <header className="InfoWin-header">
              <h2 className="InfoWin-header">{this.state.selectedPlace.title}</h2>
            </header>
            <main>
              <h2 className="InfoWin-address">Address</h2>
              <ul className="InfoWin-list">
                <li className="InfoWin-list"><span aria-labelledby="place-address" className="InfoWin-list" id="place-address">{!this.state.selectedPlace.address ? 'N/A' : (this.state.selectedPlace.address)}</span></li>
                <li className = "Disclaimer-info"> All data sourced from FourSquare API </li>
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
