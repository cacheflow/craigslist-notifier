import CitiesPage from './CitiesPage';
import ReactDOM from 'react-dom';
import React from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../actions/actions'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CitiesPage>
      </CitiesPage>
    )
  }
}

function mapStateToProps(state)  {
  console.log('state is ', state)
  return {
    showCategoryPage: state.pages.showCategoryPage,
    showContactPage: state.pages.showContactPage,
    showThankYouPage: state.pages.showThankYouPage,
    showCitiesPage: state.pages.showCitiesPage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


App.propTypes = {
  showCategoryPage: React.PropTypes.bool,
  section: React.PropTypes.string,
  number: React.PropTypes.string,
  name: React.PropTypes.string,
  city: React.PropTypes.string,
  showContactPage: React.PropTypes.bool,
  showThankYouPage: React.PropTypes.bool,
  showCitiesPage: React.PropTypes.bool,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitiesPage)
