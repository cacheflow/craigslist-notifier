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
  console.log("state is ", state)
  return {
    form: state.updateForm.form,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


App.propTypes = {
  section: React.PropTypes.string,
  number: React.PropTypes.string,
  name: React.PropTypes.string,
  city: React.PropTypes.string,
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitiesPage)
