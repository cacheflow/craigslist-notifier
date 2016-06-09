import {PropTypes} from 'react';
export const fields = ['categories']
const potentialChoices = ['housing', 'jobs', 'community', 'personals', 'for sale']
import {reduxForm} from 'redux-form'
export default class Category extends React.Component {
  doStuff(data) {
    data.preventDefault()
    this.props.selectCategory(this.props.category)
  }
  renderPotentialChoices() {
    const {
      fields: {housing, jobs, community, personals, forSale}
    } = this.props

    { potentialChoices.map((choice, id) => {
        return (
          <button key={color} className="btn btn-primary"> {choice} </button>
        )
      })
    }
  }
  render() {
    return (
      <div style={buttonStyle} className="col-xs-6">
        <span className="category-buttons" onClick={(data) => this.doStuff(data)}>
          {this.renderPotentialChoices()}
        </span>
      </div>
    )
  }
}

export default reduxForm({
  form: 'craigslist',
  fields: fields,
  initialValues: {
    categories: potentialChoices
  }
})(Category)
