import React, { Component } from 'react';
import './App.css';
import Modal from './Modal'
import './Modal.css'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsVisible: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  openModal() {
    this.setState({ modalIsVisible: true });
  }
  
  closeModal() {
    this.setState({ modalIsVisible: false,});
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1>Balink Exercise</h1>
          <button className="buttonOpen" onClick={this.openModal}>show Modal</button>
          {/* <Modal show={this.state.show} onClick={this.handleModal} onClose={this.showModal} /> */}
          {
            this.state.modalIsVisible ? 
              <Modal closeModal={this.closeModal} />
              :
              ""
          }

        </header> 
        
    </div>
    )
  }
}

export default App
