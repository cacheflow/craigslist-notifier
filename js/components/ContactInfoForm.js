// var parsley = require('parsleyjs');
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';
import {PropTypes} from 'react'

class ContactInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      name: Joi.string().required().label('name'),
      number: Joi.string().required().label('number')
    }
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

  renderMessage(message) {
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
          <input
          id="number-field"
          style={inputFieldStyles}
          ref="numberField"
          type="text"
          className="form-control"
          onBlur = {this.props.handleValidation('number')}
          placeholder="number"/>
          {this.renderMessage.call(null, this.props.getValidationMessages('number'))}
          <input
           ref="nameField"
           style={inputFieldStyles}
           type="text"
           className="form-control"
           onBlur = {this.props.handleValidation('name')}
           placeholder="name"/>
           {this.renderMessage.call(null, this.props.getValidationMessages('name'))}
          <button id="contact-form-submit" onClick={this.passRefsToParent.bind(this)} className="btn btn-success"> Submit </button>
        </form>
      </div>
    )
  }
}

ContactInfoForm.propTypes = {
  errors: PropTypes.object,
  validate: PropTypes.func,
  isValid: PropTypes.func,
  handleValidation: PropTypes.func,
  getValidationMessages: PropTypes.func,
  clearValidations: PropTypes.func
}

module.exports = validation(strategy)(ContactInfoForm)
