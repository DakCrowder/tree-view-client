import React, { Component } from 'react'
import Node from './Node'
import ErrorBanner from './ErrorBanner'
import './Node.css'
import './Factory.css'

export default class Factory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      regenerating: false,
      name: '',
      upperBound: 0,
      lowerBound: 0,
      error: '',
      numChildren: 1,
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleRegen = this.handleRegen.bind(this)
    this.handleRegenSubmit = this.handleRegenSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: this.props.factory.name,
      lowerBound: this.props.factory.lowerBound,
      upperBound: this.props.factory.upperBound,
      numChildren: this.props.factory.nodes.length,
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if(parseInt(this.state.upperBound) <= parseInt(this.state.lowerBound)) {
      this.setState({error: 'Child Lower Bound must be Less than Upper Bound'})
      return
    }

    this.props.factory.name = this.state.name
    this.props.factory.lowerBound = this.state.lowerBound
    this.props.factory.upperBound = this.state.upperBound
    this.toggleEdit()
    this.props.handleFactoryEdit(this.props.factory)
    this.setState({error: ''})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  toggleEdit() {
    this.setState(prevState => ({
      editing: !prevState.editing
    }));
  }

  handleEdit() {
    this.toggleEdit()
  }

  toggleRegen() {
    this.setState(prevState => ({
      regenerating: !prevState.regenerating
    }));
  }

  handleRegen() {
    this.toggleRegen()
  }

  handleRegenSubmit(event) {
    event.preventDefault()
    this.props.handleRegen({id: this.props.factory.id, numChildren: this.state.numChildren})
    this.toggleRegen()
  }

  renderNodes(nodes) {
    return nodes.map((node) => {
      return (
        <Node key={node.id} node={node}/>
      )
    })
  }

  renderForm() {
    if (this.state.editing) {
      return (
        <form className={'inline-container'} onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="name" maxLength="255" value={this.state.name} onChange={this.handleChange}/>
          </label>
          <label className={'child-bounds-label'}>
            Child Lower Bound:
            <input type="number" name="lowerBound" min="-1000000000" max="1000000000" value={this.state.lowerBound}
                   onChange={this.handleChange}/>
          </label>
          <label className={'child-bounds-label'}>
            Child Upper Bound:
            <input type="number" name="upperBound" min="-1000000000" max="1000000000" value={this.state.upperBound}
                   onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      )
    } else if(this.state.regenerating) {
      return(
        <form className={'inline-container'} onSubmit={this.handleRegenSubmit}>
          <label>
            Number of Children:
            <input type="number" name="numChildren" min="1" max="15" value={this.state.numChildren} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      )
    }
    return null
  }

  renderEditButton() {
    if(!this.state.regenerating) {
      return(
        <button className={'edit'} onClick={this.handleEdit}>
          Edit Factory
        </button>
      )
    }
    return null
  }

  renderRegenButton() {
    if(!this.state.editing) {
      return (
        <button className={'regen'} onClick={this.handleRegen}>
          Regenerate Factory Children
        </button>
      )
    }
    return null
  }

  render() {
    return (
      <div className={'factory'}>
        <div className={'y-connector'}>
          <div className={'x-connector'}/>
        </div>
        <div className={'data-container'}>
          <div className={'inline-container'}>
            <span>
              {this.props.factory.name}
            </span>
            <span className={'range'}>
              Current Range: {this.props.factory.lowerBound} to {this.props.factory.upperBound}
            </span>
          </div>
          {this.renderForm()}
          <div className={'button-container'}>
            {this.renderEditButton()}
            <button className={'delete'} onClick={() => this.props.handleDeleteFactory({id: this.props.factory.id})}>
              Delete Factory
            </button>
            {this.renderRegenButton()}
          </div>
          {this.state.error ? <ErrorBanner error={this.state.error} /> : null}
        </div>
        <div className={'node-container'}>
          {this.renderNodes(this.props.factory.nodes)}
        </div>
      </div>
    )
  }
}