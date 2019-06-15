import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createCar } from '../actions';




//adding some const
const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)

//adding validation to model field
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue10 = minValue(10)

//adding validation for the plate
const plate = value =>
value && !^[A-Z0-9]{3}(?:List)?$.test(value) ?
'invalida plate' : undefined

//warning for the car model
const modelWarning = value =>
value && value < 7 ? 'That is not a valid name' : undefined

//validation for the brand car name
const tooShort = value =>
value && value < 3 ? 'Make sure you are using the correct name' : undefined

// dont know how to really work on this
//if im not wrong this is use to display the error messages
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)



class CarsNew extends Component {

//maybe not event
handleSubmit = (event) => {
  event.preventDefault(); // idk if its correct

}

//after submiting the form we navigate to the index page
//dont knwo if this is the best spot to place this
 onSubmit = (values) => {
 this.props.createCar(values, (car) => {
 this.props.history.push('/'); // Navigate after submit
 return car;
 });
 }




  renderField(field) {
    return (

      <form  onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
         name="username" type="text"
        component={renderField} label="Username"
        validate={[ required, maxLength15 ]}
        component={this.renderField} // is enought with line 27?

        />

         <Field name="model" type="text"
        component={renderField} label="Model"
        validate={required,minValue10} // comming form line16-18
        warn={modelWarning}
        />

         <Field name="Brand" type="text"
        component={renderField} label="Brand"
        validate={[ required ]} // we  only required this nothing more
        warn={tooShort}
      />

       <Field name="Plate" type="text"
       //this validations should have all caps and no
       //special characters
        component={renderField} label="Brand"
        validate={[ required,plate ]} // we  only required this nothing more
        //plate comes from line 21
        //warn={tooOld}
      />


       <button className="btn btn-primary" type="submit"
        disabled={this.props.pristine || this.props.submitting}>
        Create a Car
      </button>

        </form>



      /// dont pay to much attention
      <div className="form-group">
      <label> {field.label} </label>
      <imput
      className="form-control"
      type={field.type}
      {..field.input}


      />


      </div>
      );
  }
}


//export default CarsNew;

//new way to export when we have a form
export default reduxForm({ form: 'newCarForm' })(
  connect(null, { createCar }) (CarsNew)
  );


//lewagon solution
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
//why import link ?

import Aside from '../components/aside';
import { addCar } from '../actions';

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.addCar(this.props.garage, values, () => {
      this.props.history.push('/');

    });
  }

  render(){
    return [

      <Aside key="aside" garage={this.props.garage}>
        <Link to="/">Back to list</Link>
      </Aside>,
      <div key="add" className="form-container" style={{ backgroundImage: "url('/assets/images/form.jpg')"}}>
        <div className="overlay"></div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <label htmlFor="InputBrand">Brand</label>
            <Field name="brand" type="text" placeholder="Aston Martin" component="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="InputModel">Model</label>
            <Field name="model" type="text" placeholder="DB Mark III" component="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="InputOwner">Owner</label>
            <Field name="owner" type="text" placeholder="James Bond" component="input" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="InputPlate">Plate</label>
            <Field name="plate" type="text" placeholder="DB Mark III" component="input" className="form-control" />
          </div>
          <button type="submit">Add car</button>
        </form>
      </div>
    ];
  }
};


function mapStateToProps(state) {
  return {
    garage: state.garage
  };
}

export default reduxForm({
  form: 'newCarForm' // a unique identifier
})(
  connect(mapStateToProps, {addCar}) (CarsNew)
);
