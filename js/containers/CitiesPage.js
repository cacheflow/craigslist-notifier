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

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  if(inputLength === 0) {
    return []
  }
  else {
    return cities.filter(city => city.toLowerCase().slice(0, inputLength) === inputValue)
  }
}

const getSuggestionValue = (suggestion) => {
  return suggestion
}

const renderSuggestion = (suggestion) => {
  return (
    <span> {suggestion}</span>
  )
}


class CitiesPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      previewCity: "",
      suggestions: getSuggestions('')
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
    this.setState({city: suggestion})
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

  transitionToCategoriesPage() {
    return (
      <button className="btn btn-success"> Help me</button>
    )
  }

  disableCitiesPage(event) {
    event.preventDefault()
    const onValidate = (error) => {
      if(error) {
        return false;
      }
      else {
        this.props.disableCitiesPage(this.state.city)
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
    if(this.props.showCitiesPage) {
      return (
        this.showCitiesPage()
      )
    }
    if(this.props.showCategoryPage) {
      return (
        this.categoriesPage()
      )
    }
    if(this.props.showContactPage) {
      return (
        this.contactInfoForm()
      )
    }
    if(this.props.showThankYouPage) {
      return (
        this.thankYouPage()
      )
    }
  }

  changePage(event) {
    console.log("event is ", event)
    event.preventDefault()
    this.props.disableCitiesPage()
  }

  showCitiesPage() {
    const {city, suggestions} = this.state;
    const inputProps = {
      placeholder: "Enter a city you",
      value: city,
      onChange: this.onChange.bind(this)
    }
    const {disableCitiesPage} = this.props;
    return (
      <div>
          <div className="row">
            <div id="craigslist-intro">Welcome to Craigslist Notifier </div>
            <div id="craigslist-intro"> Enter a city you want to be notified in</div>
            <form>
              <div className="col-xs-6 col-xs-push-3">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
                  onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}/>
                  {this.renderError.apply(this, this.props.getValidationMessages('city'))}
              </div>
              <div className="col-xs-6">
                <button id="submit-form-button"
                  onClick={(e) => this.disableCitiesPage(e)}
                  className="btn btn-success"> Next page</button>
              </div>
            </form>
          </div>
        </div>
    )
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

  persistToDatabase(name, number) {
    let section = this.state.section;
    const {city} = this.state;
    firebaseRef.addToDatabase(section, name, number, city)
  }
  categoriesPage() {
    let categories = ['Housing', 'Jobs', 'Personals', 'Community', 'For Sale'];
    let displayCategories = categories.map((category, index) => {
      return (
        <div>
            <Category key = {index}
              category = {category}
              selectCategory = {this.props.selectCategory}
            >
            </Category>
        </div>
      )
    })
    return (
      <div className="col-xs-12 col-sm-5 col-sm-push-4">
        <h2> Pick a section you want to be notified on </h2>
        {displayCategories}
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

CitiesPage.propTypes = {
  errors: PropTypes.object,
  validate: PropTypes.func,
  isValid: PropTypes.func,
  handleValidation: PropTypes.func,
  getValidationMessages: PropTypes.func,
  clearValidations: PropTypes.func
}

export default validation(strategy)(CitiesPage)
