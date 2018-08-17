import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class MapMenuContainer extends Component {

  constructor() {
    super();

      this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          loctations: [],
          visibleLocations: []
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

  // Search feature adapted from udacity show contacts application.

  updateQuery = (query) => {
      this.setState({ query: query.trim() })
      this.search(query)
    }

  search = (query) => {
    const { locations } = this.props;

    let showingLocations = [];
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingLocations = locations.filter((location) => match.test(location.title))
    } else {
      showingLocations = locations
    }
      showingLocations.sort(sortBy('title'))
      this.setState({visibleLocations: showingLocations});
    };

  render() {
    const { query, visibleLocations } = this.state
    const {locations} = this.props

    let displayLocations
    if (visibleLocations.length > 0) {
      displayLocations = visibleLocations
    } else {
      displayLocations = locations
    }

    return (
      <div>
          <div className="menu-wrapper">
              <div className="form" role="form">
                  <input type="text"
                         aria-labelledby="filter" placeholder="Search..."
                         className="input" role="search"
                         value={query}
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
            lat: 51.509865,
            lng: -0.118092
        }}>
        {displayLocations && displayLocations.length && displayLocations.map((location, i) =>{
          return (
            <Marker
              key={location.id}
              position={{ lat: location.position.lat, lng: location.position.lng}}
              animation={this.props.google.maps.Animation.Fo}
              title={location.title}
              category={location.category}
              address={location.address}
              onClick={this.onMarkerClick}
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
                <li><span aria-labelledby="place-address">Address</span>: <span id="place-address">{!this.state.selectedPlace.address ? 'N/A' : this.state.selectedPlace.address}</span></li>
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
})(MapMenuContainer)
