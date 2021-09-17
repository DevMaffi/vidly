import React, { Component } from 'react';
import _ from 'lodash';

import MoviesTable from './moviesTable';
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
    sortColumn: {
      column: 'title',
      order: 'asc',
    },
    pageSize: 4,
  };

  // lifecycle

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres,
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

  handleGenreSelect = genre => {
    this.setState({ currentPage: 1, selectedGenre: genre });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = column => {
    const sortColumn = { ...this.state.sortColumn };

    if (sortColumn.column === column) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.column = column;
      sortColumn.order = 'asc';
    }

    this.setState(() => ({ sortColumn }));
  };

  render() {
    const {
      movies: allMovies,
      genres,
      sortColumn,
      selectedGenre,
      currentPage,
      pageSize,
    } = this.state;
    const { length: count } = allMovies;

    if (count === 0) {
      return <p>There are no movies in database</p>;
    }

    const filtered = selectedGenre?._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>
            Showing{' '}
            {filtered.length > 1 ? `${filtered.length} movies` : '1 movie'} in
            database
          </p>

          <MoviesTable
            movies={movies}
            onLikeToggle={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={filtered.length}
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
