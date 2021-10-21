import React, { Component } from 'react';
import axios from 'axios';
import "./../App.css";
import {ReactComponent as BitcoinLogo} from "../assets/BitcoinLogo.svg";
import { ReactComponent as EthereumLogo } from "./../assets/EthereumLogo.svg"

export class Dynamicrecomm extends Component {
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
        axios.get('http://159.65.243.247:8000/recommend')
        .then(response => {
            this.setState({
                btc_best_buy:            response.data.BTC.bestbuy[0],
                btc_best_buy_price:      response.data.BTC.bestbuy[1],
                btc_best_sell:           response.data.BTC.bestsell[0],
                btc_best_sell_price:     response.data.BTC.bestsell[1],
                eth_best_buy:            response.data.ETH.bestbuy[0],
                eth_best_buy_price:      response.data.ETH.bestbuy[1],
                eth_best_sell:           response.data.ETH.bestsell[0],
                eth_best_sell_price:     response.data.ETH.bestsell[1],

            })
            console.log(response)
        })
            
        .catch(error => {
            console.log(error)
        })
    }
    render() {
        const{btc_best_buy         } = this.state
        const{btc_best_buy_price   } = this.state
        const{btc_best_sell        } = this.state
        const{btc_best_sell_price  } = this.state
        const{eth_best_buy         } = this.state
        const{eth_best_buy_price   } = this.state
        const{eth_best_sell         } = this.state
        const{eth_best_sell_price   } = this.state
        return (
            // <div className="App">
            <div className="outer price container">
                <div className="reccomendation container">
              <ul className="reccomendation list">
                <div className="reccomendation curr container">
                    <div className="reccomendation curr inner container">

                        <li><li className="subhead">BEST BUY:</li>
                            <li>{btc_best_buy} :{btc_best_buy_price}</li>
                        </li></div>

                    <div className="reccomendation curr inner container">

                        <li><li className="subhead">BEST SELL:</li>
                            <div className="flex col">
                                <span >{btc_best_sell} :{btc_best_sell_price}</span>

                            </div>
                </li>
                    </div>
                </div>
                  </ul>
                </div>

            <div className="reccomendation container">
                <ul className="reccomendation list">
                <div className="reccomendation curr container">
                    <div className="reccomendation curr inner container">

                        <li><li className="subhead">BEST BUY:</li>
                            <li>{eth_best_sell} :{eth_best_sell_price}</li>
                        </li>
                    </div>

                    <div className="reccomendation curr inner container">

                        <li><li className="subhead">BEST SELL:</li>
                            <li>{eth_best_buy} :{eth_best_buy_price}</li>
                        </li>
                    </div>
                </div>

              </ul>
            </div>
        </div>
        )
    }
}

export default Dynamicrecomm
