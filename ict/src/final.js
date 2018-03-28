import React,{ Component } from "react";

import Button from './Button/Button';
import Spinner from './Spinner/Spinner';
import './form.css';
import axios from 'axios';
import Input from './Input/Input';

export default class ContactData extends Component {
      constructor(props){
        super(props);
        this.state={
          RegistrationForm: {
              name: {
                  elementType: 'input',
                  elementConfig: {
                      type: 'text',
                      placeholder: 'Your Name'
                  },
                  value: '',
                  validation: {
                      required: true
                  },
                  valid: false,
                  touched: false
              },
              productImage:{
                  elementType:'input',
                  elementConfig:{
                    type:'file',
                    // encType:'multipart/form-data',
                    multiple:true,
                  },
                  validation: {
                      required: true
                  },
                  valid: false,
                  touched: false
              }
          },
          formIsValid: false,
          loading: false

        }
      }
      submitHandler = ( event ) => {
          event.preventDefault();
          this.setState( { loading: true } );
          var formData = {};
          for (var formElementIdentifier in this.state.submitForm) {
              formData[formElementIdentifier] = this.state.submitForm[formElementIdentifier].value;
          }
          var submit = {
                submitData: formData
          }
          axios.post( 'http://localhost/5000/products', submit )
              .then( response => {
                  this.setState( { loading: false } );
                  this.props.history.push( '/' );
              } )
              .catch( error => {
                  this.setState( { loading: false } );
              } );
      }

      checkValidity(value, rules) {
          var isValid = true;
          if (!rules) {
              return true;
          }
          if (rules.required) {
              isValid = value.trim() !== '' && isValid;
          }
          if (rules.isNumeric) {
              var pattern = /^\d+$/;
              isValid = pattern.test(value) && isValid
          }
          return isValid;
      }

      inputChangedHandler = (event, inputIdentifier) => {
          var updatedsubmitForm = {
              ...this.state.submitForm
          };
          var updatedFormElement = {
              ...updatedsubmitForm[inputIdentifier]
          };
          updatedFormElement.value = event.target.value;
          updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
          updatedFormElement.touched = true;
          updatedsubmitForm[inputIdentifier] = updatedFormElement;

          var formIsValid = true;
          for (var inputIdentifier in updatedsubmitForm) {
              formIsValid = updatedsubmitForm[inputIdentifier].valid && formIsValid;
          }
          this.setState({submitForm: updatedsubmitForm, formIsValid: formIsValid});
      }

      render () {
          var formElementsArray = [];
          for (var key in this.state.submitForm) {
              formElementsArray.push({
                  id: key,
                  config: this.state.submitForm[key]
              });
          }
          var form = (
              <form onSubmit={this.submitHandler}>
                  {formElementsArray.map(formElement => (
                      <Input
                          key={formElement.id}
                          elementType={formElement.config.elementType}
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          invalid={!formElement.config.valid}
                          shouldValidate={formElement.config.validation}
                          touched={formElement.config.touched}
                          changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                  ))}
                  <Button btnType="Success" disabled={!this.state.formIsValid}>submit</Button>
              </form>
          );
          if ( this.state.loading ) {
              form = <Spinner />;
          }
          return (
              <div className="ContactData">
                  <h4>Enter your Contact Data</h4>
                    {form}
              </div>
          );
  }
}
