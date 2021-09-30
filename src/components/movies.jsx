import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SearchBox from './common/searchBox';
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
    searchQuery: '',
    selectedGenre: null,
    sortColumn: {
      path: 'title',
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
    this.setState({ currentPage: 1, searchQuery: '', selectedGenre: genre });
  };

  handleSearch = query => {
    this.setState({ currentPage: 1, searchQuery: query, selectedGenre: null });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState(() => ({ sortColumn }));
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      searchQuery,
      sortColumn,
      selectedGenre,
      currentPage,
      pageSize,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre?._id)
      filtered = selectedGenre?._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: movies,
    };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      genres,
      searchQuery,
      sortColumn,
      selectedGenre,
      currentPage,
      pageSize,
    } = this.state;

    if (count === 0) {
      return <p>There are no movies in database</p>;
    }

    const { totalCount, data: movies } = this.getPagedData();

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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <p>
            Showing {totalCount > 1 ? `${totalCount} movies` : '1 movie'} in
            database
          </p>

          <SearchBox value={searchQuery} onSearch={this.handleSearch} />

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLikeToggle={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
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
