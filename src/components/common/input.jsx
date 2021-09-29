import React from 'react';

function Input(props) {
  const { name, label, error, ...rest } = props;

  return (
    <div className="form-group">
      <label className="clickable" htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} {...rest} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
