import axios from 'axios';

import {
  API_URL,
  FETCH_USER_FULFILLED,
  FETCH_USER_ERROR,
  FETCH_PATIENT_FULFILLED,
  FETCH_PATIENT_ERROR,
  SET_INITIAL_PATIENT_DATA,
} from '../constants';

export function getUser(id) {
  return function (dispatch) {
    axios
      .get(API_URL + USER_ENDPOINT, {
        params: { id: id },
      })
      .then((resp) => {
        dispatch({ type: FETCH_USER_FULFILLED, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_USER_ERROR, payload: err });
      });
  };
}

export function setInitialPatientData(patient_data) {
  return {
    type: SET_INITIAL_PATIENT_DATA,
    payload: patient_data,
  };
}

export function getPatient(patient_id) {
  return function (dispatch) {
    axios
      .get(API_URL + PATIENT_DETAILS_ENDPOINT, {
        params: {
          patient_id: patient_id, // todo
        },
      })
      .then((resp) => {
        dispatch({ type: FETCH_PATIENT_FULFILLED, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_PATIENT_ERROR, payload: err });
      });
  };
}
