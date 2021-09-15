import React, { Component } from 'react';

import Table from './table';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';

import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

export class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  // lifecycle

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres(),
    });
  }

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

  handleItemSelect = genre => {
    console.log(genre);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { movies: allMovies, genres, currentPage, pageSize } = this.state;
    const { length: count } = allMovies;

    if (count === 0) {
      return <p>There are no movies in database</p>;
    }

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup items={genres} onItemSelect={this.handleItemSelect} />
        </div>
        <div className="col">
          <p>Showing {count > 1 ? `${count} movies` : '1 movie'} in database</p>

          <Table
            movies={movies}
            onLikeToggle={this.handleLike}
            onDelete={this.handleDelete}
          />

          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
