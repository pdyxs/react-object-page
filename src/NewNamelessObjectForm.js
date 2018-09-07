import React, { Component } from "react";

class NewNamelessObjectForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({});
  }

  render() {
    return (
      <button
        className="btn btn-primary rounded-0"
        onClick={this.handleSubmit}
        type="button">+ new {this.props.typeName}</button>
    );
  }
}

export default NewNamelessObjectForm;
