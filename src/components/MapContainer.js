import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends Component {

  constructor() {
      super();

      this.state = {
          markers: [],
          venues: [],
          showingInfoWindow: false,
          locations: []
      };
  }

  componentDidMount() {
      this.forceUpdate()
      // this.setState({markers: this.props.markers})
      this.setState({locations: this.props.locations});
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

  render() {

    return (
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
        {this.props.locations.map((location, i) =>{
          return (
            <Marker
              key={location.id}
              position={{ lat: location.position.lat, lng: location.position.lng}}
              animation={this.props.google.maps.Animation.Fo}
              title={location.title}
              onClick={this.onMarkerClick}
            />
          )
        })}
        <InfoWindow className="InfoWin" marker={this.state.activeMaker} visible={this.state.showingInfoWindow}>
          <body>
            <header>
              <h2>{this.state.items}</h2>
              <h3><span aria-labelledby="category">Category</span></h3>
            </header>
            <main>
              <ul>
                <li><span aria-labelledby="place-address">Address</span></li>
                <li><span aria-labelledby="place-state">State</span></li>
                <li><span aria-labelledby="place-coordinates">Coordinates</span></li>
              </ul>
            </main>
          </body>
        </InfoWindow>
        </Map>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyCCot3DxWsR9HvFRpAHcr4VRs93InlV6gQ")
})(MapContainer)
