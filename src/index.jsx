import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';

import '../assets/stylesheets/application.scss';

//lewagon solution importing containers to render them
// on the app
import CarsIndex from './containers/cars_index';
import CarShow from './containers/cars_show';
import CarsNew from './containers/cars_new';
import '../assets/stylesheets/application.scss';


//importing reducers
// why on lewagon they dont import garageReducer ?
import garageReducer from './reducers/garage_reducer';

import carsReducer from './reducers/cars_reducer';

//importing the form
import { reducer as formReducer } from 'redux-form';

//importing navigation after API
import { Route } from 'react-router-dom';


//wagon

const garageName = prompt("what is your garage?") || 'garage${Math.floor(10 + (Math.random() * 90))}';

const  initialState = {
garage: garageName, // why we need garage name in the state?
cars: [
  { id: 1, brand: 'Peugeot', model: '106', owner: 'John', plate: 'WOB-ED-42' },
  { id: 2, brand: 'Renault', model: 'Scenic', owner: 'Paul', plate: 'AAA-12-BC' },
  { id: 3, brand: 'Aston Martin', model: 'DB Mark III', owner: 'James', plate: '418-ED-94' },
  { id: 4, brand: 'VW', model: 'Beetle', owner: 'George', plate: '1234-XD-75' }
]

//good practise

const store = createStore(reducers, initialState, middlewares);

const reducers = combineReducers({
 //lewagon solution
 //always initialize the state
 garage: (state = null, action) => state,
 //garage: garageReducer,
 cars: carsReducer
 form: formReducer // idk if it's ok
});

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
     <div className="view-container">

      <Switch>
      <Route path="/" exact component={CarsIndex} />

      <Route path="/cars/new" exact component={CarsNew} />

      <//Route path="/cars/show" exact component={CarShow} />
      <Route path="/cars/:id" exact component={CarShow} />


       </Switch>
      </div>

    </Router>
  </Provider>,
  document.getElementById('root')
);
