import React, { Component } from 'react';
// import StepOne from './StepOne';
// import StepTwo from './StepTwo';
// import StepThree from './StepThree';
import * as $ from 'jquery'

class MultiStepForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: 0,
            firstName: '',
            lastName: '',
            title: '',
            country: '',
            city: '',
            street: '',
            email: '',
            phone: '',
            countries: [],
            mycCountry: ''
        };

        this.detailsChanged = this.detailsChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this._isValidEmail = this._isValidEmail.bind(this);
        this._isValidPhone = this._isValidPhone.bind(this);
    }

    componentDidMount() {
        // fetch('https://restcountries.eu/rest/v2/all')
        fetch('http://localhost:8000/countries')
            .then(res => res.json())
            .then(res => {
                if (res.length) {
                    let countries = [];
                    res.map(country => {
                        countries.push(country)
                    })
                    this.setState({ countries })
                    // console.log(countries)
                }
            })
            .catch(err => console.log("Bad"))
    }

    detailsChanged(e) {
        // this.setState({value: event.target.value});
        const userInput = e.currentTarget.value;
        const inputId = e.currentTarget.id;
        console.log(`input: ${userInput}, id: ${inputId}`)

        this.setState({
            [inputId]: userInput,

        });
    }

    nextStep = (e) => {
        e.preventDefault() //prevent a browser reload/refresh.
        let { navigation, firstName, lastName, country } = this.state

        //required fieldes
        if (navigation == 0) {
            if (firstName == "" || lastName == "") {
                // alert("first name OR last name are missing");
                console.log("first name OR last name are missing");
                return null;
            }
        }
        if (navigation == 1) {
            if (country == "") {
                // alert("country is missing");
                console.log("country is missing");
                return null;
            }
        }

        if (navigation < 3 && navigation >= 0) {
            navigation++;
        }
        console.log("navigation: ", navigation)
        //activate next step on progressbar using the index of next_fs
	    $("#progressbar li").eq(navigation).addClass("active");
        this.setState({ navigation })
        // this.props.onClick(true);
    }

    prevStep = (e) => {
        e.preventDefault() //prevent a browser reload/refresh.
        let navigation = this.state.navigation;
        if (navigation < 3 && navigation >= 0) {
            navigation--;
        }
        console.log("navigation: ", navigation)
        //activate next step on progressbar using the index of next_fs
	    $("#progressbar li").eq(navigation+1).removeClass("active");
        this.setState({ navigation })
        // this.props.onClick(true);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { navigation, email } = this.state
        if (navigation == 2) {
            if (email == "") {
                // alert("email is missing");
                console.log("email is missing");
                return null;
            }
        }
        
        const customerData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            title: this.state.title,
            country: this.state.country,
            city: this.state.city,
            street: this.state.street,
            email: this.state.email,
            phone: this.state.phone
        }

        fetch('http://localhost:8000/saveCustomerDetails', {
            method: 'post',
            body: customerData//JSON.stringify(customerData)
          })
            .then(response => response.text())
            .then(response  => {
                console.log(response.body);
                alert('Your details have been successfully received!');
            })
            .catch(err => console.log(err))

        this.props.onCloseModal()
    }

    //validation for email & phone
    validationChack = (e) => {
        const userInput = e.currentTarget.value;
        const inputId = e.currentTarget.id;
        // console.log(`input: ${userInput}, id: ${inputId}`)
        let isValidPhoneNumber, isValidEmail;
        switch (inputId) {
            case "email":
                isValidEmail = this._isValidEmail(userInput)
                if (isValidEmail) {
                    this.setState({ email: userInput });
                } else {
                    this.setState({ email: "" });
                }
                break;
            case "phone":
                isValidPhoneNumber = this._isValidPhone(userInput)
                if (isValidPhoneNumber) {
                    this.setState({ phone: userInput });
                } else {
                    this.setState({ phone: "" });
                }
                break;
            default:
                break;
        }
    }
    _isValidPhone(phoneNumber) {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;
        return phoneRegex.test(phoneNumber);
    }

    _isValidEmail(email) {
        const emailRegex = /\S+@\S+\.\S+/
        return emailRegex.test(email)
    }

    render() {
        const { detailsChanged, nextStep, prevStep, handleSubmit, validationChack,
            state:
            {
                navigation,
                firstName,
                lastName,
                title,
                country,
                city,
                street,
                email,
                phone
            }
        } = this;
        let step;
        if (navigation === 0) {
            // step = <StepOne onChange={detailsChanged}/>;
            step = <div>
                <h3 className="head">Personal</h3>
                <div>
                    <input className="search"
                        type="search"
                        id="firstName"
                        // to improve the: * if i will have more time
                        placeholder="* First name:"
                        value={firstName}
                        autoComplete="off"
                        onChange={detailsChanged}
                        required
                    />
                </div>
                <div>
                    <input className="search"
                        type="search"
                        id="lastName"
                        placeholder="* Last name:"
                        value={lastName}
                        autoComplete="off"
                        onChange={detailsChanged}
                        required
                    />
                </div>
                <div>
                    <input className="search"
                        type="search"
                        id="title"
                        placeholder="Title:"
                        value={title}
                        autoComplete="off"
                        onChange={detailsChanged}
                    />
                </div>
            </div>

        } else if (navigation === 1) {
            // step = <StepTwo onChange={detailsChanged}/>;
            step = <div>
                <h3 className="head">Address</h3>
                <div className="row p-1">
                    {/* <label className="mb-0">
                        <span style={{ color: "red", margin: "5px" }}>*</span>
                        countries
                    </label> */}
                    {/* <input type="search" id="mycCountry" className="" list="countriesList" value={this.state.value}  /> */}
                    <input className="search"
                        type="search"
                        id="country"
                        placeholder="* Country:"
                        value={country}
                        list="countriesList"
                        onChange={detailsChanged}
                        required
                    />
                    <datalist id="countriesList">
                        {
                            this.state.countries.length > 0 ?
                                this.state.countries.map((item, i) => {
                                    // if (item.name !== "")
                                        return <option key={i}>{item.name}</option>
                                })
                                :
                                ""
                        }
                    </datalist>
                </div>
                <div>
                    <input className="search"
                        type="search"
                        id="city"
                        placeholder="City:"
                        value={city}
                        onChange={detailsChanged}
                    />
                </div>
                <div>
                    <input className="search"
                        type="search"
                        id="street"
                        placeholder="Street:"
                        value={street}
                        onChange={detailsChanged}
                    />
                </div>
            </div>
        } else {
            // step = <StepThree onChange={detailsChanged}/>;
            step = <div>
                <h3 className="head">Contactability</h3>
                <div>
                    <input className="search"
                        type="mail"
                        id="email"
                        placeholder="* Email:"
                        value={email}
                        onChange={detailsChanged}
                        onBlur={validationChack}
                        required
                    />
                </div>
                <div>
                    <input className="search"
                        type="number"
                        id="phone"
                        placeholder="Phone number:"
                        value={phone}
                        onChange={detailsChanged}
                        onBlur={validationChack}

                    />
                </div>
            </div>
        }
        return (
            <form >
                {step}
                <hr />
                <div>
                    {
                        navigation !== 0 ?
                            <button className="buttonPrev" value="Prev" onClick={prevStep}>
                                <span>Back</span>
                            </button>
                            :
                            ""
                    }

                    {
                        navigation !== 2 ?
                            <button className="buttonNext" value="Next" onClick={nextStep}>
                                <span>Next</span>
                            </button>
                            :
                            <button className="buttonSub" value="Next" onClick={handleSubmit}>
                                <span>Submit</span>
                            </button>
                    }
                </div>
            </form>
        );
    }
}

export default MultiStepForm;