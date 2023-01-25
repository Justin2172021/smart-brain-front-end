import React, { Component } from "react";
import UIForm from "../../components/uiForm/UIForm";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import validator from 'validator';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            blankName: "",
            invalidEmail: "",
            invalidPassword: "",
            blankForm: ""   
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
        if (!validator.isLength(event.target.value, { min: 3 })) {
            this.setState({ blankName: "Name field must contain at least three characters" });
        } else {
            this.setState({ blankName: "" });
            this.setState({ blankForm: ""});
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
        if (!validator.isEmail(event.target.value)) {
            this.setState({ invalidEmail: "Invalid Email Entered" });
        } else {
            this.setState({ invalidEmail: "" });
            this.setState({ blankForm: ""});
        }
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
        if (!validator.isStrongPassword(event.target.value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            this.setState({ invalidPassword: "Password not complex enough...minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1" });
        } else {
            this.setState({ invalidPassword: "" });
            this.setState({ blankForm: ""});
        }
    }

    onSubmitSignIn = () => {
        const { name, email, password} = this.state;
        if (!name || !email || !password) {
            return this.setState({ blankForm: "Form cannot be blank"});
        }
        fetch("https://smart-brain-api-server-e2eb.onrender.com/register", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange("Home");    
            }
        })   
    }

    inputFields = [
        { label: "Name", name: "name", type: "text", id: "name", onChange: this.onNameChange, divClassName: "mt3", inputClassName: "pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" },
        { label: "Email", name: "email-address", type: "email", id: "email-address", onChange: this.onEmailChange, divClassName: "mt3", inputClassName: "pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" },
        { label: "Password", name: "Password", type: "password", id: "password", onChange: this.onPasswordChange, divClassName: "mv3", inputClassName: "pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" },
        { type: "submit", value: "Register", name: "register", onClick: this.onSubmitSignIn, inputClassName: "b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib", divClassName: "pa2" }
    ]

    render() {
        const { invalidEmail, blankName, invalidPassword, blankForm } = this.state;
        return (
            <div>
                <UIForm inputFields={this.inputFields} legend={"Register"} />
                <ErrorMsg invalidEmail={invalidEmail} blankName={blankName} invalidPassword={invalidPassword} blankForm={blankForm}  />
            </div>
        );
    }   
}

export default Register;