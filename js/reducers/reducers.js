import {DISABLE_CITIES_PAGE, SELECT_CATEGORY, SUBMIT_CONTACT_INF0, UPDATE_FIELD} from '../actions/actions';
import {reducer as formReducer} from 'redux-form';
const update = require('react/lib/update');

export const reducers = {
  form: formReducer
}
const initialState = {
  userData: [
    {
      section: "",
      number: "",
      name: "",
      city: "",
      id: 0
    }
  ]
};


// export default function changePages(state = initialState, action) {
//   switch(action.type) {
//     case DISABLE_CITIES_PAGE:
//       return Object.assign({}, state, {showCitiesPage: false})
//     case UPDATE_FIELD:
//       return {
//         userData: [
//           {
//             section: "",
//             number: "",
//             name: "",
//             city: val
//           }
//         ]
//       }
//     default:
//       return state
//   }
// }
//
//
// function increment(state) {
//   state.userData.reduce((maxId, userDataId) => {
//     Math.max(userDataId.id, maxId.id) - 1 + 1;
//   });
// }
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
