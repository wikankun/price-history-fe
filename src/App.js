import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddItem from "./components/add-item.component";
import EditItem from "./components/edit-item.component";
import ItemsList from "./components/items-list.component";
import ItemInfo from "./components/item.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/items"} className="navbar-brand">
            Price History
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/items"} className="nav-link">
                Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/items"]} component={ItemsList} />
            <Route exact path="/add" component={AddItem} />
            <Route path="/items/:id/edit" component={EditItem} />
            <Route path="/items/:id" component={ItemInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
