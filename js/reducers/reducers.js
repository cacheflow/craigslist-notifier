import {UPDATE_CITY, UPDATE_SECTION, UPDATE_NAME, UPDATE_NUMBER, UPDATE_PAGE} from '../actions/actions';


export const reducers = {
  updateForm: updateForm,
  updatePage: updatePage
}
const initialState = {
  form: {}
};

function updateForm (state = {form: {}}, action) {
  switch(action.type) {
    case UPDATE_CITY:
      return Object.assign({}, state, {form: { city: action.payload}})

    case UPDATE_SECTION:
      return Object.assign({}, state, {form: { section: action.payload}})

    case UPDATE_NAME:
      return Object.assign({}, state, {form: { name: action.payload}})

    case UPDATE_NUMBER:
      return Object.assign({}, state, {form: { number: action.payload}})

    default:
      return state
  }
}

function updatePage(state = {page: 0}, action) {
  switch(action.type) {
    case UPDATE_PAGE:
      return Object.assign({}, state, {page: { page: action.payload}})

    default:
      return state
  }
}
