import React, { Component } from 'react';
import axios from 'axios';

export default class Movie extends Component {
    
    state = {
        movieInput: "",
        movieList: [],
        inputToggle: "",
        isEdit: false,
    }

    componentDidMount = async () => {
        
        try {
            let allMovie = await axios.get(
                "http://localhost:3002/movie/get-all"
            );

            this.setState({
                movieList: allMovie.data.data,
            });

        } catch (e) {
            console.log(e);
        }
    }
    
    render() {
        return (
            <div>
                {this.state.movieList.map((item) => {
                    return (
                        <div key={item.id}>
                            <span style={{margin: "10px"}}>{item.movie}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
}
