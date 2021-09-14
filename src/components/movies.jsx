import React, { Component } from 'react';

import { getMovies } from '../services/fakeMovieService';

export class Movies extends Component {
  state = { movies: getMovies() };

  // handlers

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  render() {
    const { movies } = this.state;

    if (movies.length === 0) {
      return <p>There are no movies in database</p>;
    }

    return (
      <>
        <p>
          Showing {movies.length > 1 ? `${movies.length} movies` : '1 movie'} in
          database
        </p>

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
            {movies.map(movie => (
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
}

export default Movies;
