import React, { Component } from 'react';
import axios from 'axios';

export default class Movie extends Component {
    
    state = {
        movieInput: "",
        movieList: [],
        inputToggle: "",
        isEdit: false,
    };

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
    };
    
    handleMovieInputOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleMovieSubmit = async () => {
        
        try {
            let createdMovie = await axios.post(
                "http://localhost:3002/movie/create-movie",
                {movie: this.state.movieInput}
            );

            let newMovieArrayList = [
                ...this.state.movieList,
                createdMovie.data.data,
            ];

            this.setState({
                movieList: newMovieArrayList,
            });
        } catch (e) {
            console.log(e);
        }
    };

    handleDeleteById = async (id, params) => {
        
        try {
            let deletedMovie = await axios.delete(
                `http://localhost:3002/movie/delete/${id}`
            );
            let newDeletedMovieArrayList = this.state.movieList.filter(
                (item) => item._id !== deletedMovie.data.data._id
            );
            
            this.setState({
                movieList: newDeletedMovieArrayList,
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    render() {
        return (
            <div style={{marginTop: 20, textAlign: 'center'}}>
                <div style={{marginTop: 20}}>
                    <input
                        type="text"
                        name="movieInput"
                        value={this.state.movieInput}
                        onChange={this.handleMovieInputOnChange}
                    />
                </div>
                <br />
                <button onClick={this.handleMovieSubmit}>Submit SON</button>
                <br />
                <br />
                {this.state.movieList.map((item) => {
                    return (
                        <div key={item.id}>
                            <span style={{margin: "10px"}}>{item.movie}</span>
                            <button onClick={() => this.handleDeleteById(item._id)} style={{margin: "10px"}} className="btn btn-warning">
                                Delete SON
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    }
}
