import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';
import {PropTypes} from 'react'
export const fields = ['city', 'category', 'name', 'number'];
import {reduxForm} from 'redux-form';

class ContactInfoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  passRefsToParent(event) {
    event.preventDefault()
    const onValidate = (error) => {error ? console.log("we got errors", error) : console.log("NO ERRORS")}
    let name = this.refs.nameField.value;
    let number = this.refs.numberField.value;
    this.props.validate(onValidate)
  }

  getValidatorData() {
    return {
      name: this.refs.nameField.value,
      number: this.refs.numberField.value
    }
  }

  renderError(message) {
    console.log(message)
    return (
      <span className="alert-danger"> {message} </span>
    )
  }

  render() {
    let inputFieldStyles = {
      width: "50%"
    }
    let secondHeaderStyles = {
      whiteSpace: "normal"
    }
    return (
      <div id="contact-form">
        <form>
          <h2 styles={secondHeaderStyles}> We just need your contact information to notify you when a new ad has been posted. </h2>
          <input {...this.props.fields.number}
          id="number-field"
          style={inputFieldStyles}
          ref="numberField"
          type="text"
          className="form-control"
          placeholder="number"/>

          <input
           ref="nameField"
           style={inputFieldStyles}
           {...this.props.fields.name}
           type="text"
           className="form-control"
           placeholder="name"/>
          <button id="contact-form-submit" onClick={this.passRefsToParent.bind(this)} className="btn btn-success"> Submit </button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'craigslist',
  fields,
  destroyOnUnmount: false
})(ContactInfoForm)
