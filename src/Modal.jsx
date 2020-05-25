import React, { Component } from 'react';
import MultiStepForm from './Form/MultiStepForm'

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    onCloseModal = () => {
        this.props.closeModal();
        
    };

    render() {
        return (
            <div className="modal" id="modal">
                <button className="close-button" onClick={this.onCloseModal} data-toggle="tooltip" title="Close modal">X</button>
                {/* <p className="head">Personal details</p> */}
                {/* <!-- progressbar --> */}
                <ul id="progressbar">
                    <li class="active">Step One</li>
                    <li>Step Two</li>
                    <li>Step Three</li>
                </ul>
                <hr />
                <MultiStepForm onCloseModal={this.onCloseModal}/>
            </div>
        );
    }
}

export default Modal;