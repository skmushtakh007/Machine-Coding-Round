
import { useState } from 'react';
import './App.css'

const FormValidation = () => {
    const defaultValues = {
        firstname: {
            id: 'firstname',
            label: 'First Name',
            placeholder: 'Enter your first name....',
            type: 'text',
            value: '',
            isError: false,
            errorMsg: "First name cannot be empty"
        },
        lastname: {
            id: 'lastname',
            label: 'Last Name',
            placeholder: 'Enter your last name....',
            type: 'text',
            value: '',
            isError: false,
            errorMsg: "Last name cannot be empty"
        },
        email: {
            id: 'email',
            label: 'Email',
            placeholder: 'Enter your email address....',
            type: 'email',
            value: '',
            isError: false,
            errorMsg: "Email address cannot be empty"
        },
        password: {
            id: 'password',
            label: 'Password',
            placeholder: 'Enter your password....',
            type: 'password',
            value: '',
            isError: false,
            errorMsg: "Password connot be empty"
        },
        cPassword: {
            id: 'cPassword',
            label: 'Confirm Password',
            placeholder: 'Enter your Confirm Password....',
            type: 'password',
            value: '',
            isError: false,
            errorMsg: "Confirm password cannot be empty"
        }
    };
    const [formData, setFormData] = useState(defaultValues);
    const [ispassMatch, setPassMatch] = useState(true);

    const handleInput = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        console.log(key, value);
        const copyformdata = { ...formData };
        copyformdata[key].value = value;
        setFormData(copyformdata);
        isValidForm();
    }
    console.log(formData);

    const passwordMatch = () => {
        const copyformdata = { ...formData };
        const pass = copyformdata['password'].value;
        const cpass = copyformdata['cPassword'].value;
        if (pass !== cpass) {
            setPassMatch(false);
        } else {
            setPassMatch(true);
        }
    }

    const isValidForm = () => {
        //created shallow copy ( Collecting data using spread operator )
        const copyformdata = { ...formData };

        //Iterating keys
        Object.keys(copyformdata).forEach(key => {
            //collecting single key
            const obj = copyformdata[key];
            obj.isError = !obj.value ? true : false;
            passwordMatch();
        })
        setFormData(copyformdata);
    }

   

    const handleFormSubmit = (e) => {
        e.preventDefault();
        isValidForm();
    }
    console.log('passwordMatch ', ispassMatch)
    return (
        <div className="App">
            <div className="container">
                <form onSubmit={handleFormSubmit}>
                    {
                        Object.keys(formData).map((key) => {
                            const { id, label, placeholder, type, value, isError, errorMsg } = formData[key];
                            return <div key={id.item} className="form-item">
                                <input
                                    onChange={handleInput}
                                    id={id}
                                    label={label}
                                    placeholder={placeholder}
                                    type={type}
                                    value={value}
                                    className={
                                        isError && 'error-border'
                                    }
                                />
                                {
                                    isError && <span className='error'>{errorMsg}</span>
                                }
                                {
                                    key === 'cPassword' && !ispassMatch && <span className='error'>Password does not match</span>
                                }
                            </div>

                        })

                    }
                    <div className='form-item'>
                        <button>submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default FormValidation
