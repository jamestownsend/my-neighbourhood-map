import React, { Component } from 'react';

class MenuButton extends Component {

    constructor() {
      super();

  }

  open = () => {
      const sideBar = document.querySelector( ".menu-wrapper" );

      sideBar.style.display === 'none' ? sideBar.style.display = 'block' : sideBar.style.display = 'none';
  }

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
