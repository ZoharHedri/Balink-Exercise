// import React, { Component } from 'react'

// export class StepOne extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             userInput: this.props.value,
//             // The id of the 'input' element
//             inputId: ''
//         }

//         this.handleChange = this.handleChange.bind(this)
//     }

//     handleChange() {
//         const userInput = e.currentTarget.value;
//         const inputId = e.currentTarget.id;

//         if(userInput !== '') {
//             this.setState({
//                 userInput: userInput,
//                 inputId: inputId
//             });
//         } else {
//             this.setState({
//                 userInput: '',
//                 inputId: ''
//             });
//         }
//         this.setState({
//             [id]: value
//         });
//         console.log(`input: ${userInput}, id: ${inputId}`)
//         //this.props.detailsChanged(userInput ,inputId)
//     }


//     render() {
//         return (
//             <div>
//                 <h3 className="head">firstName</h3>
//                 <div>
//                     <input className="search" 
//                         type="search" 
//                         id="firstName"
//                         placeholder="First name:" 
//                         value={this.state.firstName} 
//                         autoComplete="off"
//                         onChange={this.handleChange} 
//                     />                    
//                 </div>
//                 <div>
//                     <input className="search"
//                         type="search" 
//                         id="lastName"
//                         placeholder="Last name:" 
//                         value={this.state.lastName} 
//                         autoComplete="off"
//                         onChange={this.handleChange} 
//                     />
//                 </div>
//                 <div>
//                     <input className="search"
//                         type="search" 
//                         id="title"
//                         placeholder="Title:" 
//                         value={this.state.title} 
//                         autoComplete="off"
//                         onChange={this.handleChange} 
//                     />
//                 </div>
//             </div>
//         )
//     }
// }

// export default StepOne
