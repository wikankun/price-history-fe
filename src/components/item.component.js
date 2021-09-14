import React, { Component } from "react";
import Chart from "react-apexcharts";
import ItemDataService from "../services/item.service";
import { Link } from "react-router-dom";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.getItem = this.getItem.bind(this);
    this.getPriceHistory = this.getPriceHistory.bind(this);

    this.state = {
      message: "",
      options: {
        colors: ["#343a40"],
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false,
          }
        },
        yaxis: {
          title: {
            text: "Price (IDR)"
          },
          labels: {
            formatter: function (value) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
          }
        },
        tooltip: {
          x: {
            format: "HH:mm dd MMM yyyy"
          },
          y: {
            formatter: function (value) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
          }
        },
      },
    };
  }

  componentDidMount() {
    this.getItem(this.props.match.params.id);
    this.getPriceHistory(this.props.match.params.id);
  }

  getItem(id) {
    ItemDataService.get(id)
      .then(response => {
        this.setState({
          currentItem: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async getPriceHistory(id) {
    ItemDataService.getPriceHistory(id)
      .then(response => {
        let rows = [];
        response.data.forEach(ph => {
          let date = new Date(ph.created_at)
          rows.push({x: date, y: ph.price})
        });
        let res = [{data: rows, name: "Price"}]
        if (rows.length > 0) {
          this.setState({
            series: res
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  async updatePrice(id) {
    ItemDataService.updatePriceHistory(id)
      .then(response => {
        this.setState({
          message: "The price was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentItem, series, options } = this.state;

    return (
      <div>
        {currentItem ? (
          <div className="item-info">
            <h4>Item</h4>
            <div>
              <p>
                {currentItem.name} <a href={currentItem.url} target="_blank" rel="noreferrer noopener"> </a>
              </p>
            </div>

            <h4>Price History</h4>
            {series ? (
              <div className="item-price">
                <Chart
                  options={options}
                  series={series}
                  type="line"
                  height="400"
                />
              </div>
            ) : (
              <div>
                <br />
                <p>Price History not available yet...</p>
              </div>
            )}

            <div>
              <Link
                to={"/items/" + currentItem.id + "/edit"}
                className="btn btn-sm btn-secondary"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => this.updatePrice(currentItem.id)}
                className="btn btn-sm btn-secondary"
              >
                Update Price Now
              </button>
              <p>{this.state.message}</p>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please wait...</p>
          </div>
        )}
      </div>
    );
  }
}
