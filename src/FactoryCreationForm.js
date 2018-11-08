import React, { Component } from 'react';
import ErrorBanner from './ErrorBanner'

export default class FactoryCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numChildren: 1,
      lowerBound: 0,
      upperBound: 100,
      error: '',
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()

    if(parseInt(this.state.upperBound) <= parseInt(this.state.lowerBound)) {
      this.setState({error: 'Child Lower Bound must be Less than Upper Bound'})
      return
    }
    let data = this.state
    delete data.error
    this.props.handleSubmit(data)
    this.setState({name: '', numChildren: 1, lowerBound: 0, upperBound: 100, error: ''})
  }

  render() {
    return (
      <form className={'factory-form'} onSubmit={this.handleSubmit}>
        <h3>
          Create a New Factory:
        </h3>
        <div>
          <label>
            Name:
            <input type="text" name="name" maxLength="255" required={true} value={this.state.name} onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Number of Children:
            <input type="number" name="numChildren" min="1" max="15" value={this.state.numChildren} onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Children Lower Bound:
            <input type="number" name="lowerBound" min="-1000000000" max="1000000000" value={this.state.lowerBound} onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Children Upper Bound:
            <input type="number" name="upperBound" min="-1000000000" max="1000000000" value={this.state.upperBound} onChange={this.handleChange} />
          </label>
        </div>
        {this.state.error ? <ErrorBanner error={this.state.error} /> : null}
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}