import React from 'react';

function MovieForm(props) {
  const { match, history } = props;

  return (
    <div>
      <h1>MovieForm {match.params.id}</h1>
      <button
        onClick={() => history.push('/movies')}
        className="btn btn-primary"
      >
        Save
      </button>
    </div>
  );
}

export default MovieForm;
