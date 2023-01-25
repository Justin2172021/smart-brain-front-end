import React from "react";

const UIForm = ({ inputFields, pTagFields, legend }) => {
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">{legend}</legend>
                        {inputFields.map((field) => {
                            return (
                                <div key={field.name} className={field.divClassName}>
                                    <label className="db fw6 lh-copy f6" htmlFor={field.name}>{field.label}</label>
                                    <input
                                        className={field.inputClassName}
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onClick={field.onClick}
                                    />
                                </div>
                            )
                        })}
                        </fieldset>
                        { pTagFields !== undefined
                            ? <div>
                                {pTagFields.map((field) => {
                                    return (
                                        <div key={field.name} className={field.divClassName}>
                                            <p
                                                className={field.pClassName}
                                                onClick={field.onClick}
                                            >{field.pText}</p>
                                        </div>
                                    )
                                })}
                              </div>
                            : <div/>
                        }
                    </div>
                </main>
            </article>
    );
}

export default UIForm;