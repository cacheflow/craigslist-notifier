
export default class ContactInfoForm extends React.Component {
  passRefsToParent() {
    let name = this.refs.nameField.value;
    let number = this.refs.numberField.value;
    this.props.submitContactInfo(name, number)
  }
  render() {
    let inputFieldStyles = {
      width: "50%"
    }
    let secondHeaderStyles = {
      whiteSpace: "normal"
    }
    return (
      <div>
        <h2 styles={secondHeaderStyles}> We just need your contact information to notify you when a new ad has been posted. </h2>
        <input ref="numberField"style={inputFieldStyles} type="text" className="form-control" placeholder="number"/>
        <input ref="nameField" style={inputFieldStyles} type="text" className="form-control" placeholder="name"/>
        <button onClick={() => this.passRefsToParent()} className="btn btn-success"> Submit </button>
      </div>
    )
  }
}
