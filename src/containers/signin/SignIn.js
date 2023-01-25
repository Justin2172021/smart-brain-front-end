import React, { Component } from "react";
import UIForm from "../../components/uiForm/UIForm";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import validator from 'validator';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
            invalidEmail: "",
            blankForm: "",
            invalidPassword: "",
            signInErrorMsg: ""        
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
        if (!validator.isEmail(event.target.value)) {
            this.setState({ invalidEmail: "Invalid Email Entered" });
            this.setState({ signInErrorMsg: ""});
            this.setState({ blankForm: ""});
        } else {
            this.setState({ invalidEmail: "" });
            this.setState({ blankForm: ""});
            this.setState({ signInErrorMsg: ""});
        }
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
        if (!event.target.value) {
            this.setState({ invalidPassword: "Password cannot be blank" });
            this.setState({ signInErrorMsg: ""});
            this.setState({ blankForm: ""});
        } else {
            this.setState({ invalidPassword: "" });
            this.setState({ blankForm: ""});
            this.setState({ signInErrorMsg: ""});
        }
    }

    onSubmitSignIn = () => {
        const { signInEmail, signInPassword } = this.state;
        if (!signInEmail || !signInPassword) {
            return this.setState({ blankForm: "Credentials cannot be blank"});
        }
        fetch("https://smart-brain-api-server-e2eb.onrender.com/signin", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {  // does the user exist? Did we receive a user with a property of id?
                this.props.loadUser(user);
                this.props.onRouteChange("Home");    
            } else {
                this.setState({ signInErrorMsg: user});
            }
        })   
    }

    inputFields = [
        { label: "Email", name: "email-address", type: "email", id: "email-address", onChange: this.onEmailChange, divClassName: "mt3", inputClassName: "pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" },
        { label: "Password", name: "Password", type: "password", id: "password", onChange: this.onPasswordChange, divClassName: "mv3", inputClassName: "pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" },
        { type: "submit", value: "Sign In", name: "Sign In", onClick: this.onSubmitSignIn, inputClassName: "b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib", divClassName: "pa2" }
    ]

    pTagFields = [
        { divClassName: "lh-copy mt3", onClick: () => this.props.onRouteChange("Register"), pClassName: "f6 link dim black db pointer", pText: "Register", name: "Register" }
    ]

    render() {
        const { invalidEmail, blankForm, invalidPassword, signInErrorMsg } = this.state;
        return (
            <div>
                <UIForm inputFields={this.inputFields} pTagFields={this.pTagFields} legend={"Sign In"} />
                <ErrorMsg invalidEmail={invalidEmail} blankForm={blankForm} invalidPassword={invalidPassword} signInErrorMsg={signInErrorMsg} /> 
            </div>  
        );
    }
}

export default SignIn;