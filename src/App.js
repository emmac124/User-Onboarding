import React, { useState, useEffect } from 'react';
import Form from './component/Form';
import axios from 'axios';
import schema from './validation/schema';
import * as yup from 'yup';
import './App.css';

const initialFormValues = {
  name: '', //text
  email: '', //email
  password: '', //password
  terms: false, //checkbox
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}

const initialUser = [];

const initialDisabled = true;

function App() {
  
  const [user, setUser] = useState(initialUser); //array
  const [formValues, setFormValues] = useState(initialFormValues); //object
  const [formErrors, setFormErrors] = useState(initialFormErrors); //object
  const [disabled, setDisabled] = useState(initialDisabled); //boolean

  //HELPERS
  const getUser = () => {
    //GET
    axios
    .get('https://reqres.in/api/users')
    .then(res => {
      setUser([res.data]);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const postNewUser = (newUser) => {
    //POST
    axios
    .post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUser([...user, res.data]);
      setFormValues(initialFormValues);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const inputChange = (name, value) => {
    yup 
    .reach(schema, name)
    .validate(value)
    .then(() => { 
      setFormErrors({
        ...formErrors, [name]: '',
      })
    })
      .catch(err => {
        setFormErrors({
          ...formErrors, [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ['terms'].filter(
        term => formValues[term]
      )
    }

    //post new user using postNew user
    postNewUser(newUser);

  }

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    //validating all form values
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues]) 

  return (
    <div className="App">
      <header>
        <h1>Create New User</h1>
      </header>
      <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors} />
      <div>
      {
        user.map(use => {
          return (
            <div>
              <h2>{use.name}</h2>
              <h3>{use.email}</h3>
              <h4>{use.password}</h4>
            </div>
          );
        })
      }
      </div>
    </div>
  );
  }

export default App;
