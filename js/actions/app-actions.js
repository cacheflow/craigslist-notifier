export const DISABLE_CITIES_PAGE = 'DISABLE_CITIES_PAGE'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SUBMIT_CONTACT_INF0 = 'SUBMIT_CONTACT_INF0'


export const disbaleCitiesPage(bool) {
  return {
    type: DISABLE_CITIES_PAGE,
    bool
  }
}

export const selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export const submitContactInfo(name, number) {
  return {
    type: SUBMIT_CONTACT_INF0,
    name,
    number  
  }
}
