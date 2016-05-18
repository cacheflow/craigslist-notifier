export const DISABLE_CITIES_PAGE = 'DISABLE_CITIES_PAGE'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SUBMIT_CONTACT_INF0 = 'SUBMIT_CONTACT_INF0'


export function disableCitiesPage(city) {
  return {
    type: DISABLE_CITIES_PAGE,
    city
  }
}

export function selectCategory(section) {
  console.log("category is ", section)
  return {
    type: SELECT_CATEGORY,
    section
  }
}

export function submitContactInfo() {
  return {
    type: SUBMIT_CONTACT_INF0
  }
}

export function updateField(field, val) {
  return {
    type: UPDATE_FIELD,
    field,
    val    
  }
}
