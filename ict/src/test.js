import React, { Component } from 'react';

import axios, { post } from 'axios';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  submitHandler = e => {
    //const data = new formData();
    e.preventDefault(); // Stop form submit
    console.log(this.state.file);
    this.fileUpload(this.state.file);
  };
  getPhoto(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file
      });
    };

    reader.readAsDataURL(file);
  }

  fileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post('http://localhost:5000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler} encType="multipart/form-data">
          <input type="text" name="name" />
          <br />
          <input type="file" name="productImage" onChange={this.getPhoto} />
          <br />
          <input type="submit" value="Submit File" />
        </form>
      </div>
    );
  }
}
