import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeURL = this.onChangeURL.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
      id: null,
      name: "",
      url: "",
      message: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeURL(e) {
    this.setState({
      url: e.target.value
    });
  }

  saveItem() {
    var data = {
      name: this.state.name,
      url: this.state.url
    };

    ItemDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          url: response.data.url,
          message: "The item was created successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newItem() {
    this.setState({
      id: null,
      name: "",
      url: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newItem}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                className="form-control"
                id="url"
                required
                value={this.state.url}
                onChange={this.onChangeURL}
                name="url"
              />
            </div>

            <button onClick={this.saveItem} className="btn btn-success">
              Submit
            </button>
            <p>{this.state.message}</p>
          </div>
        )}
      </div>
    );
  }
}
