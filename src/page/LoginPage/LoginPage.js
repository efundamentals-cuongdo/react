import axios from "axios";
import React, { useState, useContext } from "react";
import LoginContext from "../../contexts/LoginContext";

const LoginPage = ({ setToken, setCurrentUser }) => {
    const token = useContext(LoginContext)
    const [value, setValue] = useState({
        email: '',
        password: ''
    })
    const handleFieldChange = evt => {
        setValue({
            ...value,
            [evt.target.name]: evt.target.value
        })
    }
    const validateEmail = email => {
        if (!email) return 'Required'
    }
    const validatePassword = password => {
        if (!password) return 'password Required'
        if (password.length < 8) return 'At least 8  characters'
    }
    const handleOnSubmit = (evt) => {
        evt.preventDefault()
        //console.log(value);
        axios({
            url: 'https://60dff0ba6b689e001788c858.mockapi.io/tokens',
            method: 'GET',
            data: value
        }).then(({ data }) => {
            console.log(data)
            setToken(data.token)
            setCurrentUser({ id: data.userId })
            localStorage.setItem('TOKEN', data.token)
            localStorage.setItem('USERID', data.userId)
            axios.defaults.headers.common['Authorization'] = data.token
        })
    }

    const errorEmail = validateEmail(value.email);
    const errorPassord = validatePassword(value.password);
    const [touched, setTouch] = useState({ email: false, password: false, submit: false })
    const handleOnBlur = evt => {
        const name = evt.target.name
        setTouch({
            ...touched,
            [name]: true
        })
    }
    if (token) return (<div>Login successfully</div>)
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div><label style={{ minWidth: 100, display: 'inline-block', marginBottom: 10 }}>Email:</label>
                    <input type="email"
                        onChange={handleFieldChange}
                        placeholder="Email"
                        name="email"
                        onBlur={handleOnBlur}
                    ></input></div>
                {(touched.email) && <div style={{ color: "red" }}>{errorEmail}</div>}
                <div><label style={{ minWidth: 100, display: 'inline-block', marginBottom: 10 }}>Password:</label>
                    <input type="password"
                        onChange={handleFieldChange}
                        name="password"
                        onBlur={handleOnBlur}
                    ></input></div>
                {(touched.password) && <div style={{ color: "red" }}>{errorPassord}</div>}
                <button type="submit" name="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;