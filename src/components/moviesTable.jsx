import React, { Component } from 'react';

import Like from './common/like';
export class moviesTable extends Component {
  raiseSort = column => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.column === column) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.column = column;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onLikeToggle, onDelete } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => this.raiseSort('title')}
            >
              Title
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => this.raiseSort('genre.name')}
            >
              Genre
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => this.raiseSort('numberInStock')}
            >
              Stock
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => this.raiseSort('dailyRentalRate')}
            >
              Rate
            </th>
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
                  onLikeToggle={() => onLikeToggle(movie)}
                  liked={movie.liked}
                />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default moviesTable;
