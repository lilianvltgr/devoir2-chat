import React, {useState} from "react";
import axios from "axios";
import {Typography} from "@mui/material";

/**
 * Login page component handles user authentication for the application.
 * It provides a form where users can enter their email and password.
 * The component submits these credentials to a server endpoint
 * and handles the response by setting session storage and managing authentication states.
 *
 * @returns {JSX.Element} A form for user login.
 */
const Login = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorConnection, setErrorConnection] = useState(false)
    const handleLogin = (event) => {
        event.preventDefault();
        let requestUrl = `http://localhost:8080/UserController/authentification?mail=${mail}&password=${password}`
        axios.post(requestUrl, {
            headers:
                {
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Origin': '*'
                }
        })
            .then(res => {
                console.log("userId" + res.data)
                // if the data is an userId > 0
                if (res.data !== -1) {
                    // Add information to session storage : userId and time of the session's end
                    sessionStorage.setItem("userId", res.data)
                    let endSessionTime = new Date();
                    endSessionTime.setMinutes(endSessionTime.getMinutes()+30);
                    endSessionTime = endSessionTime.toLocaleString();
                    sessionStorage.setItem("endSessionTime", endSessionTime);
                    setErrorConnection(false);
                    // Redirect to the app page
                    window.location.href = '/MyChatsList';
                } else {
                    setErrorConnection(true);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="login-container">
            <Typography variant="h3" component="h2">
                Chat-App
            </Typography><br></br>
            <form>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Email</label>
                    <input type="email" name="mail" className="form-control" id="mail" value={mail}
                           onChange={e => {
                               setMail(e.target.value)
                           }} required={true}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={password}
                           onChange={e => {
                               setPassword(e.target.value)
                           }} required={true}/>
                    {errorConnection && (<div style={{color: 'red'}}>Login ou mot de passe incorrect</div>)}
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>Connexion</button>
            </form>
        </div>
    );
}

export default Login;
