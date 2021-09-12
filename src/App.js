import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from './footer'
import Header from './header'

import AddItem from "./components/add-item.component";
import EditItem from "./components/edit-item.component";
import ItemsList from "./components/items-list.component";
import ItemInfo from "./components/item.component";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/items"]} component={ItemsList} />
            <Route exact path="/add" component={AddItem} />
            <Route path="/items/:id" component={ItemInfo} />
            <Route path="/items/:id/edit" component={EditItem} />
          </Switch>
        </div>

        <Footer/>
      </div>
    );
  }
}

export default App;
