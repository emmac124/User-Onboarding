import React from 'react';

export default function Form({values, change, submit, disabled, errors}) {

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    const onChange = (evt) => {
        const {name, value, type, checked} = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    return  (
       <form onSubmit={onSubmit} className='form-container'>
           <div className='form-group inputs'>
               <h3>Enter Information</h3>
               <label>Name
                   <input value={values.name} type='text' name='name' onChange={onChange} />
               </label>
               <label>Email
                   <input type='email' name='email' onChange={onChange} value={values.email} />
               </label>
               <label>Password
                   <input name='password' type='password' value={values.password} onChange={onChange} />
               </label>
               <br /><br />
               <label>Agree to Terms of Service
                    <input type='checkbox' name='terms' checked={values.terms} onChange={onChange} />
               </label>
               <br />
               <br />
           </div>
           <div className='form-group submit'>
               <button disabled={disabled}>Submit</button>
               <div className="errors">
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                </div>
           </div>
       </form>
    );
}