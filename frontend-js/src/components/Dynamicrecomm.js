import React, { Component } from 'react';
import axios from 'axios';


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
            this.setState({ post: response.data })
            console.log(response)
        })
            
        .catch(error => {
            console.log(error)
        })
    }
    render() {
        const { post } = this.state;
        return (
            <div>
                dynamic recommendation:
                {JSON.stringify(post)}
            </div>
        )
    }
}

export default Dynamicrecomm
