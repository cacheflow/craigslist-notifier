const ReactDOM = require('react-dom');
const $ = require('jquery');
const path = require('path');
import firebaseRef from '../server/firebase';
import Category from '../components/Category';
import ContactInfoForm from '../components/ContactInfoForm';
import GSAP from 'react-gsap-enhancer'
import Autosuggest from 'react-autosuggest';
const cities = require("./../../public/data/cities")

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  if(inputLength === 0) {
    console.log("returning array")
    return []
  }
  else {
    return cities.filter(city => city.toLowerCase().slice(0, inputLength) === inputValue)
  }
}

function getSuggestionValue(suggestion) {
  return suggestion
}

function renderSuggestion(suggestion) {
  return (
    <span> {suggestion}</span>
  )
}

function onSuggestionSelected(event, {suggestion, suggestionValue, sectionIndex, method}) {
  console.log("suggestion selected is ", suggestion)
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCategoryPage: false,
      section: "",
      number: "",
      name: "",
      city: "",
      abbrvCity: "",
      showContactPage: false,
      showThankYouPage: false,
      suggestions: getSuggestions(''),
      showCitiesPage: true
    };
  }

  addSectiontoState(sectionSelected) {
    this.formatSection(sectionSelected);
    this.updateClickState("showCategoryPage", false)
    this.updateClickState("showContactPage", true)
  }

  onChange(event, {newValue}) {
    this.setState({city: newValue})
    console.log("changing city in on change", this.state.city)
  }

  onSuggestionsUpdateRequested({value}) {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  onSuggestionSelected(event, {suggestion, suggestionValue, sectionIndex, method}) {
    this.setState({city: suggestion})
    console.log("city is", this.state.city)
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
    }
    this.setState({section: formattedSection});
    console.log(this.state.section)
  }

  updateClickState(form, bool) {
    if(form === "showCategoryPage") {
      console.log("update stuff", form, bool)
      this.setState({showCategoryPage: bool})
    }
    else if(form === "showContactPage") {
      console.log("contact form is", bool)
      this.setState({showContactPage: bool})

    }
    else if(form === "showThankYouPage", bool) {
      this.setState({showThankYouPage: bool})
    }
  }

  componentDidMount() {
    console.log("calling componentDidMount")
  }

  transitionToCategoriesPage() {
    return (
      <button className="btn btn-success"> Help me</button>
    )
  }

  renderPage() {
    let categoryClicked = this.state.submittedCategoryForm;
    let submittedContactForm = this.state.submittedContactForm;
    if(this.state.showCitiesPage) {
      return (
        this.showCitiesPage()
      )
    }
    if(this.state.showCategoryPage) {
      return (
        this.categoriesPage()
      )
    }
    if(this.state.showContactPage) {
      return (
        this.contactInfoForm()
      )
    }
    if(this.state.showThankYouPage) {
      return (
        this.thankYouPage()
      )
    }
  }

  showCitiesPage() {
    const {city, suggestions} = this.state;
    const inputProps = {
      placeholder: "Enter a city you",
      value: city,
      onChange: this.onChange.bind(this)
    }
    return (
      <div>
          <div className="row">
            <div id="craigslist-intro">Welcome to Craigslist Notifier </div>
            <div id="craigslist-intro"> Enter a city you want to be notified in</div>
            <div className="col-xs-6 col-xs-push-3">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
                onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={onSuggestionSelected}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}/>
            </div>
            <div class="col-xs-6">
              <button id="submit-form-button" className="btn btn-success"> Next page</button>
            </div>
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

  submitContactInfo(name, number) {
    this.updateClickState("showContactPage", false)
    this.updateClickState("showThankYouPage", true)
    this.persistToDatabase(name, number)
  }

  persistToDatabase(name, number) {
    let section = this.state.section;
    firebaseRef.addToDatabase(section, name, number)
  }
  categoriesPage() {
    let categories = ['Housing', 'Jobs', 'Personals', 'Community', 'For Sale'];
    let displayCategories = categories.map((category, index) => {
      return (
        <div>
            <Category key = {index}
              category = {category}
              addSectiontoState = {this.addSectiontoState.bind(this)}
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

export default GSAP()(App)
ReactDOM.render(<App />, document.getElementById('craigslist-container'));
