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


//solution
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Aside from '../components/aside';
import { removeCar } from '../actions';


class CarsShow extends Component {
  handleClick = () => {
    this.props.removeCar(this.props.history, this.props.car);

  }

  render() {
    const car = this.props.car;
    if(!car) {
      return(
          <Aside key="aside" garage={this.props.garage}>
          <Link to="/">Back to list</Link>
        </Aside>);


        )
    }

    return [
    <Aside key="aside" garage={this.props.garage}>
        <Link to="/">Back to list</Link>
      </Aside>,
      <div className="car-container" key="car">
        <div className="car-card">
          <img className="car-picture" src="/assets/images/logo_square.svg" />
          <div className="car-details">
            <span>{car.brand} - {car.model}</span>
            <ul>
              <li><strong>Owner:</strong> {car.owner}</li>
            </ul>
            <span className="plate">{car.plate}</span>
          </div>
          <button className="delete" onClick={this.handleClick}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
            Delete
          </button>
        </div>
      </div>

    ];
  }
};


function mapStateToProps(state, ownProps) {

  const id = ParseInt(ownProps.match.params.id);
  return {
    car: state.cars.find((car) => car.id === id),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({removeCar}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarsShow));
