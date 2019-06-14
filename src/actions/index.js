// TODO: add and export your own actions





const BASE_URL = 'https:wagon-garage-api.herokuapp.com/my-awesome-garage/cars';

export const FETCH_CARS = 'FETCH_CARS';
export const CAR_SELECTED = 'CAR_SELECTED';
export const CAR_CREATED = 'CAR_CREATED';

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


export function createCar(body) {
  //dont know what to put as a key in the fetch
const request = fetch('${BASE_URL}?key={API_KEY}', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)

}).then(response => response.json())
  .then(callback);

return {
  type: CAR_CREATED,
  payload: request
};

}

//delete a car
export function deleteCar(callback){
const request = fetch('${BASE_URL}?key=${API_KEY}', {

}).then(response => response.json())
  .then(callback);
 return {
  type: DELETE_CAR,
  payload: request

 };
}
