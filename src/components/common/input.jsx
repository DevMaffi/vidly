import React from 'react';

function Input(props) {
  const { autoFocus, name, label, value, onChange } = props;

  return (
    <div className="form-group">
      <label className="clickable" htmlFor={name}>
        {label}
      </label>
      <input
        autoFocus={autoFocus}
        onChange={onChange}
        value={value}
        name={name}
        className="form-control"
        id={name}
        type="text"
      />
    </div>
  );
}

export default Input;
