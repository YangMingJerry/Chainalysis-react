import React, { Component } from 'react';
import axios from 'axios';
import "./../App.css";


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
        axios.get('http://localhost:8000/recommend')
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
            <div className="reccomendation container">
              <ul className="reccomendation list">
                <li>{<span className="recText">The best sell for BTC is with</span>}
                {btc_best_sell} :
                {btc_best_sell_price}
                </li>
                  <li>{<span className="recText">The best buy for BTC is with</span>}
                {btc_best_buy} :
                {btc_best_buy_price}
                </li>
                  </ul>
                <ul className="reccomendation list">
                <li>{<span className="recText">The best sell for ETH is with</span>}
                {eth_best_sell} :
                {eth_best_sell_price}
                </li>
                  </ul>
                <ul className="reccomendation list">
                <li>{<span className="recText">The best buy for ETH is with</span>}
                {eth_best_buy} :
                {eth_best_buy_price}
                </li>
                  </ul>
            </div>


        )
    }
}

export default Dynamicrecomm
