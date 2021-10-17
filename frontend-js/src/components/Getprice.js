import React, { Component } from 'react'
import axios from 'axios'
export class Getprice extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        // Simple GET request using axios
        axios.get('http://localhost:8000/prices')
            .then(response => {
                this.setState({ post: response.data })
                console.log(response)
            })
                
            .catch(error => {
                console.log(error)
            })
        }
    
    render() {
        const { post } = this.state;

        // console.log(data)
        return (
            <div>
                list of prices
                {JSON.stringify(post)}
            </div>
        )
    }
}

export default Getprice
