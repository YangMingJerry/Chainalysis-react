import React, { Component } from 'react';
import axios from "axios";
import { ReactComponent as CoinbaseLogo } from "./../assets/CoinbaseLogo.svg"
import { ReactComponent as BitcoinLogo } from "./../assets/BitcoinLogo.svg"
import { ReactComponent as EthereumLogo } from "./../assets/EthereumLogo.svg"
import KrakenLogo from "./../assets/KrakenLogo.png"
import "./../App.css";

export class
Test extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        // need to make the initial call to getData() to populate
        // data right away
        this.getData();

        // Now we need to make it run at a specified interval
        setInterval(this.getData, 1000); // runs every 1 seconds.
    }

    getData = () => {
        axios.get('http://159.65.243.247:8000/prices')
        .then(response => {
            this.setState({
                btc_kraken_buy:    response.data.kraken.BTC.buy,
                btc_coinbase_buy:  response.data.coinbase.BTC.buy,
                btc_kraken_sell:   response.data.kraken.BTC.sell,
                btc_coinbase_sell: response.data.coinbase.BTC.sell,
                eth_kraken_buy:    response.data.kraken.ETH.buy,
                eth_coinbase_buy:  response.data.coinbase.ETH.buy,
                eth_kraken_sell:   response.data.kraken.ETH.sell,
                eth_coinbase_sell: response.data.coinbase.ETH.sell,

                })
            console.log(response)
        })

        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const { btc_kraken_buy  }    = this.state
        const { btc_coinbase_buy}    = this.state
        const { btc_kraken_sell }    = this.state
        const { btc_coinbase_sell}   = this.state
        const { eth_kraken_buy  }    = this.state
        const { eth_coinbase_buy}    = this.state
        const { eth_kraken_sell }    = this.state
        const { eth_coinbase_sell}   = this.state

        console.log(btc_kraken_buy > btc_kraken_sell)

        return (
        <div className="outer price container">

          <div className="btc price container">
            <BitcoinLogo className="currencyLogo"/>
            <div className="btc price inner container">
              <div className="coinbase btc price">
              <CoinbaseLogo className="exchangeLogo"/>
                <div className="flex col">
                  <span className="coinbase btc price buy">
                      buy: {btc_coinbase_buy}
                  </span>
                  <span className="coinbase btc price sell">
                      sell: {btc_coinbase_sell}
                  </span>
                </div>
              </div>
              <div className="kraken btc price">
               <img src={KrakenLogo} alt="Kraken logo purple" className="exchangeLogo" />
                <div className="flex col">
                  <span className="kraken btc price buy">
                    buy: {btc_kraken_buy}
                  </span>
                  <span className="kraken btc price sell">
                    sell: {btc_kraken_sell}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="eth price container">
            <EthereumLogo className="currencyLogo"/>
            <div className="eth price inner container">
              <div className="coinbase eth price">
              <CoinbaseLogo className="exchangeLogo" />
                <div className="flex col">
                  <span className="coinbase eth price buy">
                    buy: {eth_coinbase_buy}
                  </span>
                  <span className="coinbase eth price sell">
                    sell: {eth_coinbase_sell}
                  </span>
                </div>
              </div>
              <div className="kraken eth price">
                <img src={KrakenLogo} alt="Kraken logo purple" className="exchangeLogo" />
                <div className="flex col">
                  <span className="kraken eth price buy">
                    buy: {eth_kraken_buy}
                  </span>
                  <span className="kraken eth price sell">
                    sell: {eth_kraken_sell}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
    }
    }
export default Test
