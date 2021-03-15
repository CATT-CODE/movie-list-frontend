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

    handleDeleteById = async (id) => {
        
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
    
    handleEditToggle = async (id) => {
        let toggledEditButton = this.state.movieList.map((item) => {
            if (item._id === id) {
                item.isEdit = !item.isEdit;
            }
            return item;
        });

        this.setState({
            groceryList: toggledEditButton
        });
    };

    handleEditOnChange = async (event) => {
        this.setState({
            inputToggle: event.target.value,
        });
    };
    
    handleEditById = async (id, newMovieItem) => {
        let updatedMovieItem = this.state.movieList.map((item) => {
            if (item._id === id) {
                item.movie = newMovieItem;
            }
            return item;
        });

        this.setState({
            movieList: updatedMovieItem
        });
    }

    handleToggleButtonClick = (id, movieItem) => {
        this.setState({
            inputToggle: movieItem,
        });

        this.handleEditToggle(id);

        this.handleEditById(id, this.state.inputToggle)
    }

    
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
                            {item.isEdit && (
                                <input
                                    value={this.state.inputToggle}
                                    style={{margin: "10px"}}
                                    onChange={this.handleEditOnChange}
                                    name="inputToggle"
                                />
                            )}
                            <button onClick={() => this.handleDeleteById(item._id)} style={{margin: "10px"}} className="btn btn-warning">
                                Delete SON
                            </button>
                            <button onClick={() => this.handleToggleButtonClick(item._id, item.movie)} style={{margin: "10px"}} className="btn btn-warning">
                                {item.isEdit ? "submit" : "edit"}
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    }
}
