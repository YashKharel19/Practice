import React,{ Component } from "react";
import Form from 'react-jsonschema-form';
// import 'bootstrap';
import './formtest.css';
import axios from 'axios';

const schema = {
    type:"object",
    properties:{
      RegistrationForm: {
        type: "object",
        properties: {
          Name: {type: "string" },
          Age:  {type: "number"},
          Gender: {type: "string",
                   enum:["Male","Female"]},
          Description: {type: "string" },
          SelectFiles: {
                          type: "array",
                          items: {
                            type: "string",
                            format: "data-url",
                          }
                       }
        }
      }
    }
}

const uiSchema = {
  RegistrationForm: {
    Name: {
      "ui:widget": "text",
      "ui:autofocus": true,
      "ui:placeholder": "Please Enter Your Name",
      className:'formall'
    },
    Age:  {
      "ui:placeholder": "Please Enter Your Age",

    },
    Gender: {
      "ui:widget": "radio"
    },
    Description: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 5
      },
      "ui:placeholder": "Enter Some Description"
    },
    SelectFiles:{
      items:{
          "ui:widget": "file"
      }
    }
  },
}

export default class FormTest extends Component{
  constructor(props){
    super(props);
    this.state={
      uri:undefined
    };
  }

  onHandleSubmit = (formData) =>{
      this.setState({
      uri:formData.file
    });

    axios.post(' http://localhost:5000/products',{formData})
    .then(function (response) {
        console.log(response);
        // alert('Product Uploaded Successfully')
        // window.location.reload();
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  render(){
    return(
        <div>
          <Form
                enctype="multipart/form-data"
                className='form-all'
                schema={schema}
                uiSchema={uiSchema}
                onSubmit={({formData})=>{
                    console.log(formData);
                    this.onHandleSubmit(formData);
                  }
                }
                 />

        </div>
    );
  }
}
