export default class Category extends React.Component {
  doStuff(data) {
    data.preventDefault()
    this.props.selectCategory(this.props.category)
  }
  render() {
    console.log(`props are ${this.props}`)
    var buttonStyle = {
      paddingBottom: "10px"
    }
    return (
      <div style={buttonStyle} className="col-xs-6">
        <span className="category-buttons" onClick={(data) => this.doStuff(data)}>
          <button className="btn btn-primary">
            {this.props.category}
          </button>
        </span>
      </div>
    )
  }
}
