import React, {useState} from "react";
import axios from "axios";
import {Typography} from "@mui/material";

const Login = (props) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorConnection, setErrorConnection] = useState(false)
    const handleLogin = (event) => {
        event.preventDefault();
        let requestUrl = "http://localhost:8080/UserController/getUserByMail?mail=" + mail
        axios.get(requestUrl, {
            headers:
                {
                    'Access-Control-Allow-Origin': '*'
                }
        })
            .then(res => {
                console.log("user" + res.data)
                if (res.data["password"] === password) {
                    sessionStorage.setItem("userId", res.data["userId"])
                    console.log("connecté")
                    setErrorConnection(false);
                    // Token JWT
                    if (res.headers.authorization) {
                        console.log("token = " + res.headers.authorization)
                        sessionStorage.setItem("token", res.headers.authorization)
                    }
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
