import React from 'react';

function Select(props) {
  const { name, label, options, error, ...rest } = props;

  return (
    <div className="form-group">
      <label className="clickable" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} {...rest} className="form-control">
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Select;
