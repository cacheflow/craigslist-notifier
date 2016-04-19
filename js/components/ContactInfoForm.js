// var parsley = require('parsleyjs');
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

class ContactInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      name: Joi.string().regex(/[a-zA-Z]{2,20}/).required().label('name'),
      number: Joi.string().regex(/[0-9]{10}/).required().label('number')
    }
  }

  passRefsToParent(event) {
    let name = this.refs.nameField.value;
    let number = this.refs.numberField.value;
    this.props.submitContactInfo(event)
  }

  getValidatorData() {
    return {
      let name = this.refs.nameField.value;
      let number = this.refs.numberField.value;
    }
  }

  renderHelptext(message) {
    return (
      <span> {message} </message>
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
        <h2 styles={secondHeaderStyles}> We just need your contact information to notify you when a new ad has been posted. </h2>
        <input
        id="number-field"
        style={inputFieldStyles}
        ref="numberField"
        type="text"
        className="form-control"
        onBlur = {this.props.handleValidation('number')}
        placeholder="number"/>
        {() => this.renderHelptext(this.props.getValidationMessages('number'))}
        <input
         ref="nameField"
         style={inputFieldStyles}
         type="text"
         className="form-control"
         onBlur = {this.props.handleValidation('name')}
         placeholder="name"/>
         {() => this.renderHelptext(this.props.getValidationMessages('name'))}
        <button onClick ={() => this.passRefsToParent()} className="btn btn-success"> Submit </button>
      </div>
    )
  }
}

export default validation(strategy)(ContactInfoForm)
