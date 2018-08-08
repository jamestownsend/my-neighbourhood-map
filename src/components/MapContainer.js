import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends Component {

  componentDidMount() {
      this.forceUpdate()
    }

  render() {

    return (
      <div className="map-container">
        <Map
          role="application"
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 51.509865,
            lng: -0.118092
        }}>
        {this.props.markers.map(marker =>{
          return (
            <Marker
              position={{ lat: marker.lat, lng: marker.long}}
              onClick={this.onMarkerClick}
              name={marker.name}/>
          )
        })}


          <InfoWindow onClose={this.onInfoWindowClose}>

          </InfoWindow>
        </Map>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyCCot3DxWsR9HvFRpAHcr4VRs93InlV6gQ")
})(MapContainer)
