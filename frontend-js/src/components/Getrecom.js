import React, { Component } from 'react'
import axios from 'axios'

export class Getrecom extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        // Simple GET request using axios
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
                list of recomm
                {JSON.stringify(post)}
            </div>
        )
    }
}

export default Getrecom
