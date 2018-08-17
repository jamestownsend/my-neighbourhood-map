import React, { Component } from 'react';

// import MapMenuContainer from './MapContainer.js';


class MenuButton extends Component {

    constructor() {
      super();

      this.state = {
        locations: [],
        query: '',
        visibleLocations: []
      };
  }

  open = () => {
      const sideBar = document.querySelector( ".menu-wrapper" );

      sideBar.style.display === 'none' ? sideBar.style.display = 'block' : sideBar.style.display = 'none';
  }

// Search feature adapted from udacity show contacts application.


    render() {
      return (
        <div>
            <div className="hamburger" onClick={this.open}>
                <div className="hamburgerline"></div>
                <div className="hamburgerline"></div>
                <div className="hamburgerline"></div>
            </div>
          </div>

      );
    }
  }


export default MenuButton;
