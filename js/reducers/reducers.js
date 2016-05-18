import {DISABLE_CITIES_PAGE, SELECT_CATEGORY, SUBMIT_CONTACT_INF0} from '../actions/actions';
import {combineReducers} from 'redux'
const update = require('react/lib/update');

const rootReducer = combineReducers({
  changePages
})

const initialState = [
  {
    showCategoryPage: false,
    showContactPage: false,
    showThankYouPage: false,
    showCitiesPage: true
  }
]


export default function changePages(state = initialState, action) {
  switch(action.type) {
    case DISABLE_CITIES_PAGE:
      return Object.assign({}, state, {showCitiesPage: false})

    default:
      return state
  }
}


function increment(state) {
  state.userData.reduce((maxId, userDataId) => {
    Math.max(userDataId.id, maxId.id) - 1 + 1;
  });
}
// export default submitUserData(state = state.userData, action) {
//   switch(action.type) {
//     case SELECT_CITY:
//       return
//   }
// }


//
// export default function submitContact(state =  initialState, action) {
//   switch(action.type) {
//     case SUBMIT_CONTACT_INF0:
//     return Object.assign({}, initialState, {showContactPage: false})
//
//     default:
//       return state
//   }
// }
