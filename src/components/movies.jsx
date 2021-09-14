import React, { Component } from 'react';

import Like from './common/like';
import Pagination from './common/pagination';

import { getMovies } from '../services/fakeMovieService';

export class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
  };

  // handlers

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState(() => ({ movies }));
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  render() {
    const { movies, pageSize } = this.state;

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
              <th />
              <th />
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
                  <Like
                    onLikeToggle={() => this.handleLike(movie)}
                    liked={movie.liked}
                  />
                </td>
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
        <Pagination itemsCount={movies.length} pageSize={pageSize} />
      </>
    );
  }
}

export default Movies;
