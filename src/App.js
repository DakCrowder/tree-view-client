import React, { Component } from 'react';
import './App.css';
import io from "socket.io-client";
import Factory from './Factory'
import FactoryCreationForm from './FactoryCreationForm'

class App extends Component {

  constructor() {
    super()
    this.state = {
      root: {},
      socket: {}
    }

    this.handleFactoryOSubmit = this.handleFactoryOSubmit.bind(this)
    this.handleFactoryEdit = this.handleFactoryEdit.bind(this)
    this.handleDeleteFactory = this.handleDeleteFactory.bind(this)
    this.handleFactoryRegen = this.handleFactoryRegen.bind(this)
  }

  componentDidMount() {
    const socket = io('http://localhost:3000', {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false
    });

    socket.on('tree', (data) => {
      this.setState({root: data.root})
    });

    socket.on('validationError', (error) => {
      alert(error)
    })

    this.setState({socket})
  }

  handleFactoryOSubmit(data) {
    this.state.socket.emit('addFactory', data)
  }

  handleFactoryEdit(data) {
    this.state.socket.emit('editFactory', data)
  }

  handleDeleteFactory(data) {
    this.state.socket.emit('deleteFactory', data)
  }

  handleFactoryRegen(data) {
    this.state.socket.emit('regenFactoryNodes', data)
  }

  renderFactories() {
    const factoryItems = this.state.root.factories.map((factory) => {
      return (
        <Factory factory={factory}
                 key={factory.id}
                 handleFactoryEdit={this.handleFactoryEdit}
                 handleDeleteFactory={this.handleDeleteFactory}
                 handleRegen={this.handleFactoryRegen}
        />
      )
    })
    return (
      <div className={'factory-container'}>{factoryItems}</div>
    );
  }

  render() {
    return (
      <div className={'App'}>
        <h3 className={'root'}>
          Root {this.state.root.id}
        </h3>
        <div>
          {this.state.root.factories ? this.renderFactories() : null}
        </div>
        <div>
          <FactoryCreationForm handleSubmit={this.handleFactoryOSubmit}/>
        </div>
      </div>
    );
  }
}

export default App;
