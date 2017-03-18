const path = require('path');
import firebaseRef from '../server/firebase';
import Category from '../components/Category';
import ContactInfoForm from '../components/ContactInfoForm';
import Autosuggest from 'react-autosuggest';
const cities = require("./../../public/data/cities")
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';
import {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['city']
import bindActionCreators from 'redux'; 
import { connect } from 'react-redux'


const validate = values => {
  const errors = {}
  if(!values.city) {
    errors.city = 'Required'
  }
  else if(values.city.length < 3) {
    errors.city = "Must be more than 3 characters"
  }
  return errors
}


export default class CitiesPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      previewCity: ""
    };
    this.validatorTypes = {
      city: Joi.string().regex(/^[a-zA-Z]{4,30}$/).required().label('city')
    }
  }

  componentDidMount() {
    console.log("your props are ", this.props)
  }

  addSectiontoState(sectionSelected) {
    console.log(`section is ${sectionSelected}`)
    this.formatSection(sectionSelected);
    this.updateClickState("showCategoryPage", false)
    this.updateClickState("showContactPage", true)
  }

  onChange(event, {newValue}) {
    this.setState({city: newValue})
    // console.log(this.state.city)
  }


  getValidatorData() {
    return {
      city: $('.react-autosuggest__input').val()
    }
  }

  onSuggestionsUpdateRequested({value}) {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  onSuggestionSelected(event, {suggestion, suggestionValue, sectionIndex, method}) {
    this.props.updateField(suggestion)
    // console.log("city is", this.state.city)
  }

  formatSection(section) {
    let formattedSection;
    switch(section) {
      case "Community":
        formattedSection = "ccc"
        break;
      case "Housing":
        formattedSection = "hhh"
        break;
      case "For Sale":
        formattedSection = "sss"
        break;
      case "Services":
        formattedSection = "bbb"
        break;
      case "Jobs":
        formattedSection = "jjj"
        break;
      case "Personls":
        formattedSection = "ppp"
        break;
    }
    this.setState({section: formattedSection});
    // console.log(this.state.section)
  }

  updateClickState(form, bool) {
    if(form === "showCategoryPage") {
      // console.log("update stuff", form, bool)
      this.setState({showCategoryPage: bool})
    }
    else if(form === "showContactPage") {
      this.setState({showContactPage: bool})

    }
    else if(form === "showThankYouPage", bool) {
      this.setState({showThankYouPage: bool})
    }
  }

  disableCitiesPage(event) {
    event.preventDefault()
    const onValidate = (error) => {
      if(error) {
        return false;
      }
      else {
        this.setState({page: 2})
      }
    }
    this.props.validate(onValidate)
  }


  renderError(message) {
    console.log(message)
    return (
      <span className="alert-danger"> {message} </span>
    )
  }

  enableCategoriesPage() {
    this.setState({showCategoryPage: true});
  }

  renderPage() {
    let categoryClicked = this.state.submittedCategoryForm;
    let submittedContactForm = this.state.submittedContactForm;
    switch(this.state.page) {
      case 1:
        return this.showCitiesPage()
      case 2:
        return this.categoriesPage()
      case 3:
        return this.contactInfoForm()
      case 4:
        return this.thankYouPage()
    }
  }

  changePage(event) {
    console.log("event is ", event)
    event.preventDefault()
    this.props.disableCitiesPage()
  }

  showCitiesPage() {
    return (
      <div>
          <div className="row">
            <div id="craigslist-intro">Welcome to Craigslist Notifier </div>
            <div id="craigslist-intro"> Enter a city you want to be notified in</div>
            <form>
              <div className="col-xs-6 col-xs-push-3">
                <input type="text" placeholder="City" onChange = {(eventData) => this.handleTextOnEnter(eventData)} />
              </div>
              <div className="col-xs-6">
                <button id="submit-form-button"
                  onClick={(eventData) => this.handleSubmit(eventData)}
                  className="btn btn-success"> Next page</button>
              </div>
            </form>
          </div>
        </div>
    )
  }

  handleTextOnEnter(eventData) {
    let eventStf = eventData.persist()
    this.props.updateCity(eventData.target.value)
    console.log("event data is ", eventData.target.value)
  }

  handleSubmit(eventData) {
    eventData.preventDefault()
    this.props.updateCity()
    this.setState({page: 2})
  }

  contactInfoForm() {
    return (
      <ContactInfoForm
      submitContactInfo = {this.submitContactInfo.bind(this)}
      submittedContactForm = {this.state.submittedContactForm}>
      </ContactInfoForm>
    )
  }

  submitContactInfo() {
    console.log(`event is ${event}`)
    event.preventDefault(event)

    // this.updateClickState("showContactPage", false)
    // this.updateClickState("showThankYouPage", true)
    // this.persistToDatabase(name, number)
  }
  selectCategory(category) {
    this.setState({page: 3})
  }

  persistToDatabase(name, number) {
    let section = this.state.section;
    const {city} = this.state;
    firebaseRef.addToDatabase(section, name, number, city)
  }

  categoriesPage() {
    let categories = ['Housing', 'Jobs', 'Personals', 'Community', 'For Sale'];
    return (
      <div className="col-xs-12 col-sm-5 col-sm-push-4">
        <h2> Pick a section you want to be notified on </h2>
          <div>
              <Category category = {categories}
              >
              </Category>
          </div>
      </div>
    )
  }

  thankYouPage() {
    return (
      <div className="col-xs-12 col-sm-5 col-sm-push-4">
        <h2> Thank you we'll send you a text when we find new Craigslist ads</h2>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
          {this.renderPage()}
      </div>
    )
  }
}




