export default class Category extends React.Component {
  doStuff() {
    console.log("woo")
  }
  render() {
    console.log(`props are ${this.props}`)
    var buttonStyle = {
      paddingBottom: "10px"
    }
    return (
      <div style={buttonStyle} className="col-xs-6">
        <span className="category-buttons" onClick={() => this.props.addSectiontoState(this.props.category)}>
          <button className="btn btn-primary">
            {this.props.category}
          </button>
        </span>
      </div>
    )
  }
}
