import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class Menu extends Component {

    constructor() {
      super();

      this.state = {
        locations: [],
        query: ''
      };
  }

  open = () => {
      const sideBar = document.querySelector( ".menu-wrapper" );

      sideBar.style.display === 'none' ? sideBar.style.display = 'block' : sideBar.style.display = 'none';
  }

// Search feature adapted from udacity show contacts application.

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

    render() {
      const { locations } = this.props
      const { query } = this.state

      let showingLocations
      if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        showingLocations = locations.filter((location) => match.test(location.title))
      } else {
        showingLocations = locations
      }

      showingLocations.sort(sortBy('title'))

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
                           value={query}
                           onChange={(event) => this.updateQuery(event.target.value)}/>
                </div>
                <ul>
                    {showingLocations && showingLocations.length && showingLocations.map((location, i) =>
                        <li key={i}>
                            <a href="#"
                            tabIndex="0" role="button">{location.title}</a>
                        </li>
                    )}

                </ul>
            </div>
        </div>
      );
    }
  }

export default Menu;
