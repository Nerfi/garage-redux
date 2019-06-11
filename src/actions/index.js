// TODO: add and export your own actions

import { withRouter } from 'react-router-dom'
// this also works with react-router-native
// no fucking idea how this works
const Button = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('/new-location') }}
  >
    Click Me!
  </button>
))



const BASE_URL = 'https:wagon-garage-api.herokuapp.com/my-awesome-garage/cars';

export const FETCH_CARS = 'FETCH_CARS';
export const CAR_SELECTED = 'CAR_SELECTED';

export function fetchCars (car) {
const url = '${BASE_URL}/${car}/cars';
const promise = fetch(url).then(r => r.json());
  return {
    type: FETCH_CARS,
    payload: promise
  };
}


export function selectedCar(car) {
  return {
    type: SELECTED_CAR,
    payload: car // we return the car itself
  };
}
