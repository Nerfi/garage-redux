//creating new componnent for new route
//TODO display details bran, model, owner and plate


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { selectedCar } from '../actions';

class CarsShow extends Component {

  onDelete = (values) => {
    this.props.deleteCar(values,(car) => {
      this.props.history.push('/'); // navigate after submit
      return cars;

    });
}

  renderField(field) {
    return(
        <div className="form-group">
          <label >{field.Username}</label>
          <label >{field.model}</label>
          <label >{field.plate}</label>



      <button className="btn btn-primary" type="delete"
        disabled={this.props.pristine || this.props.submitting}>
        Delete Car
      </button>



        </div>
      );
  }
}





//export default CarsShow;


export default reduxForm({ form: 'showCarForm' })(
 connect(null, { CarsShow })(CarsShow)
);
