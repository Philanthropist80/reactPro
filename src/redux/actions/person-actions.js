import {
  GET_PERSONS_REQUEST,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_FAIL,
  SET_PERSONS,
  FILTER_PERSONS,
  SET_DISPLAYED_PERSONS,
  SET_MODAL,
  DELETE_PERSON_REQUEST,
  DELETE_PERSON_SUCCESS,
  DELETE_PERSON_FAIL,
  DELETE_PERSON,
  ADD_PERSON_REQUEST,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_FAIL,
  ADD_PERSON
} from '../constants/person-constants'

//const base_url = 'https://taimoor-94a2c5.pipedrive.com/v1';
//const api_token = '9959f46241f9ad08e4d7760d4b4565fad7b68786';

const base_url = 'https://taimoor-006219.pipedrive.com/v1'
const api_token = '283668278bfc5c1ccc2dac25aca3314b9a2abd59'

export function setModal(isShow) {
  return {
    type: SET_MODAL,
    payload: isShow
  }
}

function setPersons(data) {
  let persons = {}
  persons.data = data.data

  persons.data.forEach((element, ind) => {
    if (ind === 3) {
      element.imgsrc = ''
    } else {
      element.imgsrc = 'https://picsum.photos/id/' + ind * 7 + '/200/200'
    }
  })

  persons.additional_data = data.additional_data

  return {
    type: SET_PERSONS,
    payload: persons
  }
}

export function getPersons(start, limit) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PERSONS_REQUEST
    })

    if (
      getState().personPage.persons.additional_data.pagination !== undefined
    ) {
      if (
        getState().personPage.persons.additional_data.pagination
          .more_items_in_collection === false
      ) {
        dispatch({
          type: GET_PERSONS_FAIL,
          payload: 'No More Records'
        })
        return
      }
      start = getState().personPage.persons.additional_data.pagination
        .next_start
    } else start = 0

    return fetch(
      base_url +
        '/persons?start=' +
        start +
        '&limit=' +
        limit +
        '&api_token=' +
        api_token
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        console.log(response)
        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: GET_PERSONS_SUCCESS
        })
        dispatch(setPersons(data))
        dispatch(filterPersons())
      })
      .catch(error => {
        dispatch({
          type: GET_PERSONS_FAIL,
          payload: error.message
        })
      })
  }
}

export function deletePerson(index) {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_PERSON_REQUEST
    })

    const id = getState().personPage.persons.data[index].id

    return fetch(
      base_url +
        '/persons/' +
        id +
        '?api_token=9959f46241f9ad08e4d7760d4b4565fad7b68786',
      {
        method: 'DELETE'
      }
    )
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: DELETE_PERSON_SUCCESS
        })

        const filteredDeletedIndex = getState().personPage.persons.data.filter(
          person => {
            return person.id !== id
          }
        )

        dispatch(setPersonsAfterDelete(filteredDeletedIndex))
        dispatch(filterPersons())
      })
      .catch(error => {
        dispatch({
          type: DELETE_PERSON_FAIL,
          payload: error.message
        })
      })
  }
}

export function addPerson(person) {
  alert('ADD Call')
  return (dispatch, getState) => {
    dispatch({
      type: ADD_PERSON_REQUEST
    })

    return fetch(
      base_url + '/persons/?api_token=9959f46241f9ad08e4d7760d4b4565fad7b68786',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
      }
    )
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response
        }

        throw new Error(`${response.status}: ${response.statusText}`)
      })
      .then(data => {
        dispatch({
          type: ADD_PERSON_SUCCESS
        })

        dispatch(filterPersons())
      })
      .catch(error => {
        dispatch({
          type: ADD_PERSON_FAIL,
          payload: error.message
        })
      })
  }
}

export function filterPersons(searchString = '') {
  return (dispatch, getState) => {
    console.log(getState().personPage.persons.data)
    const displayedPersons = getState().personPage.persons.data.filter(
      person => {
        //return person.name.toLowerCase().includes(searchString.toLowerCase()) // For Contains Filter
        return person.name.toLowerCase().startsWith(searchString.toLowerCase()) // For StartsWith Filter
      }
    )

    dispatch({
      type: FILTER_PERSONS,
      payload: displayedPersons
    })
  }
}

function setPersonsAfterDelete(data) {
  return {
    type: DELETE_PERSON,
    payload: data
  }
}

export function setDisplayedPersons(data) {
  return {
    type: SET_DISPLAYED_PERSONS,
    payload: data
  }
}
