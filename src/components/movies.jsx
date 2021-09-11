import React, { Component } from 'react';

import { getMovies } from '../services/fakeMovieService';

export class Movies extends Component {
  state = { movies: getMovies() };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return <p>There are no movies in database</p>;
    }

    return (
      <>
        <p>Showing {count > 1 ? `${count} movies` : '1 movie'} in database</p>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  // handlers

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
}

export default Movies;
