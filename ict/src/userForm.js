import React, { Component } from 'react';
import axios from 'axios';

import Button from './Button/Button';
import Spinner from './Spinner/Spinner';
import Input from './Input/Input';

import './form.css';

export default class UserForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        submitForm: {
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
            age: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'age'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric:true
                },
                valid: false,
                touched: false
            },
            gender: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'male', displayValue: 'male'},
                        {value: 'female', displayValue: 'female'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'description'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            imageFile: {
              elementType :'input',
              elementConfig: {
                  type: 'file',
                  multiple:true,
                  action:'http://localhost:8000/products',
                  method:'POST',
                  encType:'multipart/form-data'
              },

            }

        },
        formIsValid: false,
        loading: false
      }
    }
    submitHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.submitForm) {
            formData[formElementIdentifier] = this.state.submitForm[formElementIdentifier].value;
        }
        const submit = {
            submitData: formData
        }
        axios.post( 'http:localhost:8000/products', submit )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedsubmitForm = {
            ...this.state.submitForm
        };
        const updatedFormElement = {
            ...updatedsubmitForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedsubmitForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedsubmitForm) {
            formIsValid = updatedsubmitForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({submitForm: updatedsubmitForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.submitForm) {
            formElementsArray.push({
                id: key,
                config: this.state.submitForm[key]
            });
        }
        let form = (
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
            <div className='ContactData'>
                <h4>Registration Form</h4>
                {form}
            </div>
        );
      }
    }
