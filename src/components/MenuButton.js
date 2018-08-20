import React, { Component } from 'react';

class MenuButton extends Component {

  open = () => {
      const menu = document.querySelector( ".menu-wrapper" );
      menu.style.display === 'none' ? menu.style.display = 'block' : menu.style.display = 'none';
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
