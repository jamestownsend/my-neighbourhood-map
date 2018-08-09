import React, { Component } from 'react';

class Sidebar extends Component {

    constructor() {
      super();

      this.state = {
        markers: [],
        query: ''
      };
  }


    open = () => {
        const sideBar = document.querySelector( ".menu-wrapper" );

        sideBar.style.display === 'none' ? sideBar.style.display = 'block' : sideBar.style.display = 'none';
    }

    search = (event) => {
        const query = event.target.value.toLowerCase();
        const {markers} = this.props
        const newMarkers = [];

        markers.forEach(function (marker) {
            if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                marker.setVisible(true);
                newMarkers.push(marker);
            } else {
                marker.setVisible(false);
            }
        });

        this.setState({markers: newMarkers});
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
                    {this.props.markers && this.props.markers.length && this.props.markers.map((marker, i) =>
                        <li key={i}>
                            <a href="#"
                            tabIndex="0" role="button">{marker.name}</a>
                        </li>
                    )}

                </ul>
            </div>
        </div>
      );
    }
  }

export default Sidebar;
