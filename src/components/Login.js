import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import MyChatsList from "../pages/MyChatsList"
import InviteIcon from "../icons/invite-icon.svg";


const Login = (props) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorConnection, setErrorConnection] = useState(false)

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("mail = " + mail)
        console.log("password = " + password)
        let requestUrl = "http://localhost:8080/UserController/getUserByMail?mail=" + mail
        // Requete HTTP login au backend spring
        axios.get(requestUrl, {
            headers:
                {
                    'Access-Control-Allow-Origin': '*'
                }
        })
            .then(res => {
                // Login simple
                console.log("user" + res.data)
                if(res.data["password"] === password){
                    sessionStorage.setItem("userId", res.data["userId"])
                    console.log("connecté")
                    setErrorConnection (false);
                    // Token JWT
                    if (res.headers.authorization){
                        console.log("token = " + res.headers.authorization)
                        sessionStorage.setItem("token", res.headers.authorization)
                    }
                    window.location.href = '/MyChatsList';
                }
                else {
                    setErrorConnection (true);}

            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="login-container">
            <form>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Email</label>
                    <input type="email" name="mail" className="form-control" id="mail" value={mail}
                           onChange={e => {
                               setMail(e.target.value)
                           }} requied={true}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={password}
                           onChange={e => {
                               setPassword(e.target.value)
                           }} required={true}/>
                    {errorConnection && (<div style={{ color: 'red' }}>Login ou mot de passe incorrect</div>)}
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>Connexion</button>
            </form>
            <Link to="/clientChat">
                Client chat
            </Link>
        </div>

    );
}

export default Login;
