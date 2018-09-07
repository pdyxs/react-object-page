import React, { Component } from "react";

class NewObjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name !== '') {
      this.props.onSubmit({name: this.state.name});
      this.setState({ name: '' });
    }
  }

  handleNameChange(evt) {
    this.setState({ name: evt.target.value });
  }

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control border-0"
          placeholder={this.props.placeholder}
          ref={ref => this.input = ref}
          value={this.state.name}
          onChange={this.handleNameChange}
          />
        <div className="input-group-append">
          <button
            className="btn btn-primary rounded-0"
            disabled={this.state.name.length === 0}
            onClick={this.handleSubmit}
            type="button">+</button>
        </div>
      </div>
    );
  }
}

export default NewObjectForm;
