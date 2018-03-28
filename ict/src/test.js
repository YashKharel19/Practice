import React,{ Component } from 'react';

import axios from 'axios';

export default class Test extends Component{
  submitHandler = (formData) => {
    const data = new formData()
    data.append();
    axios.post('http://localhost:5000/products',data,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then((response)=>console.log(response))
    .catch((err)=>   console.log(err));

  }
  render(){
    return(
      <div>
        <form
          onSubmit={this.submitHandler}
          method='POST'
          encType='multipart/form-data'
        >
          <input type='text' id='name'/><br />
          <input type='file' id='productImage'/><br />
          <input type='submit' />
        </form>
      </div>
    );
  }
}
