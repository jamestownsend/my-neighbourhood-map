import React, { Component } from 'react';

class Sidebar extends Component {

    constructor() {
      super();

      this.state = {
      };
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
            <div className="menu-wrapper">
                <div className="form" role="form">
                    <input type="text"
                           aria-labelledby="filter" placeholder="Search..."
                           className="input" role="search"
                           onChange={this.search}/>
                </div>
                <ul>
                    {this.state.markers && this.state.markers.length && this.state.markers.map((marker, i) =>
                        <li key={i}>
                            <a href="#" onKeyPress={this.props.openInfo.bind(this, marker)}
                               onClick={this.props.openInfo.bind(this, marker)}
                            tabIndex="0" role="button">{marker.title}</a>
                        </li>
                    )}

                </ul>
            </div>
        </div>
      );
    }
  }

export default Sidebar;
