import React, { Component } from "react";
import Chart from "react-google-charts";
import ItemDataService from "../services/item.service";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.getItem = this.getItem.bind(this);
    this.getPriceHistory = this.getPriceHistory.bind(this);

    this.state = {};
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
        const columns = [
          { type: 'datetime', label: 'Time' },
          { type: 'number', label: 'Price' }
        ];
        let rows = [];
        response.data.forEach(ph => {
          let date = new Date(Date.parse(ph.created_at))
          rows.push([date, ph.price])
        });
        this.setState({
          currentPriceHistory: [columns, ...rows]
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentItem, currentPriceHistory } = this.state;

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
            {currentPriceHistory ? (
              <Chart
                // width={'600px'}
                height={'400px'}
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={currentPriceHistory}
                options={{
                  axes: {
                    y: {
                      0: {
                        label: 'Price (IDR)'
                      },
                    },
                    x: {
                      0: {side: 'top'}
                    }
                  },
                  legend: {
                    position: 'none',
                  }
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            ) : (
              <div>
                <br />
                <p>Price History Loading...</p>
              </div>
            )}

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
