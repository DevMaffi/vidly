import { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';
import Select from './select';

export class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return {};

    const errors = error.details.reduce((res, item) => {
      res[item.path[0]] = item.message;

      return res;
    }, {});

    return errors;
  };

  validateProperty = input => {
    const { name, value } = input;
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });

    if (Object.keys(errors).length) return;

    this.doSubmit();
  };

  handleChange = e => {
    const { currentTarget: input } = e;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput = (name, label, autoFocus, type) => {
    autoFocus = autoFocus ?? false;
    type = type ?? 'text';

    const { data, errors } = this.state;

    return (
      <Input
        autoFocus={autoFocus}
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderButton = label => {
    return (
      <button
        disabled={Object.keys(this.validate()).length}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };
}

export default Form;
