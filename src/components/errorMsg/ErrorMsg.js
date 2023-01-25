import React from "react";

const ErrorMsg = ({ invalidEmail, blankName, invalidPassword, blankForm, signInErrorMsg }) => {
    return (
        <div>
            <h3>{blankForm}</h3>
            <h3>{blankName}</h3>
            <h3>{invalidEmail}</h3>
            <h3>{invalidPassword}</h3>
            <h3>{signInErrorMsg}</h3>
        </div>
    )
}

export default ErrorMsg;