import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MapContainer from './MapContainer.js';
import MenuButton from './MenuButton.js';


class Menu extends Component {

    constructor() {
      super();

      this.state = {
        locations: [],
        query: '',
        visibleLocations: []
      };
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
  }

    render() {
      const { query, visibleLocations } = this.state

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
                           value={query}
                           onChange={(event) => this.updateQuery(event.target.value)}/>
                </div>
                <ul>
                    {visibleLocations && visibleLocations.length && visibleLocations.map((location, i) =>
                        <li key={i}>
                            <a href="#"
                            tabIndex="0" role="button">{location.title}</a>
                        </li>
                    )}

                </ul>
            </div>
            <MapContainer
              locations={this.state.visibleLocations}
          />
        </div>
      );
    }
  }

export default Menu;
