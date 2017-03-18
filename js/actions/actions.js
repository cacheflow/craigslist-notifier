export const UPDATE_CITY = 'UPDATE_CITY'
export const UPDATE_SECTION = 'UPDATE_SECTION'
export const UPDATE_NAME = 'UPDATE_NAME'
export const UPDATE_NUMBER = 'UPDATE_NUMBER'
export const UPDATE_PAGE = 'UPDATE_PAGE'


export function updateCity (city) {
  console.log("UPDATEING CITY ", city)
  return {
    type: UPDATE_CITY,
    payload: city
  }
}

export function updateSection (section) {
  return {
    type: UPDATE_SECTION,
    payload: section
  }
}

export function updateName (name) {
  return {
    type: UPDATE_NAME,
    payload: name
  }
}

export function updateNumber(number) {
  return {
    type: UPDATE_NUMBER,
    payload: number
  }
}


export function updatePage(page) {
  return {
    type: UPDATE_PAGE,
    payload: page
  }
}
