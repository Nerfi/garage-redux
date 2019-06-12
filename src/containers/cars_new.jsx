import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createPost } from '../actions';




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
        //warn={aol}
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



  renderField(field) {
    return (
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


/// code copyed from the web
const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text"
        component={renderField} label="Username"
        validate={[ required, maxLength15 ]}
      />
      <Field name="email" type="email"
        component={renderField} label="Email"
        validate={email}
        warn={aol}
      />
      <Field name="age" type="number"
        component={renderField} label="Age"
        validate={[ required, number, minValue18 ]}
        warn={tooOld}
      />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation' // a unique identifier for this form
})(FieldLevelValidationForm)
