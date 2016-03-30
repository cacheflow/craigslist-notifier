const ReactDOM = require('react-dom');
const $ = require('jquery');
import firebaseRef from '../server/firebase';
import Category from '../components/Category';
import ContactInfoForm from '../components/ContactInfoForm';
import GSAP from 'react-gsap-enhancer'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCategoryPage: true,
      section: "",
      number: "",
      name: "",
      showContactPage: false,
      showThankYouPage: false
    };
  }

  addSectiontoState(sectionSelected) {
    this.setState({section: sectionSelected});
    this.updateClickState("showCategoryPage", false)
    this.updateClickState("showContactPage", true)
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

  renderPage() {
    let categoryClicked = this.state.submittedCategoryForm;
    let submittedContactForm = this.state.submittedContactForm;
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
        <div className="row">
          {this.renderPage()}
        </div>
      </div>
    )
  }
}

export default GSAP()(App)
ReactDOM.render(<App />, document.getElementById('craigslist-container'));
