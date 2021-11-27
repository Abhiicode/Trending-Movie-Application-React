import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <div style={{ display: "flex", padding: "0.5" }}>
        <Link to="/">
          <button type="button" class="btn btn-primary ownBtn">
            Movie App
          </button>
        </Link>
        <Link to="/fav">
          <button type="button" class="btn btn-info ownBtn">
            Favourite Lists
          </button>
        </Link>
      </div>
    );
  }
}

export default Navbar;
