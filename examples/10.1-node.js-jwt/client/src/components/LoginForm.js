import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import logo from './imgs/logo.png'
import {login, addOpenIdUser} from '../api-calls/AuthService'

function LoginForm ({onLogin, location, history}) {
    const googleClientId = "866457396346-piq09ek9kiofq9uspsnjulv1mu1v4s8k.apps.googleusercontent.com";
    const [loginInfo, setLoginInfo] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = e => {
        const {name, value} = e.target;
        setLoginInfo({...loginInfo, [name]: value});
    };

    const handleLocalLogin = async e => {
        e.preventDefault();
        await authenticate('local');
    };

    // If Google Login does not work then try to clear the browser cash
    // See more info @ https://github.com/anthonyjgrove/react-google-login/issues/132
    const handleGoogleResponse = async (authResponse) => {
        console.log("handleGoogleResponse.authResponse: ", authResponse);
        if (authResponse.error) {
            setError(`${authResponse.error}. ${authResponse.details || ""}`);
        } else {
            console.log('id_token from Google', authResponse.tokenObj.id_token);
            console.log('access_token from Google', authResponse.tokenObj.access_token);
            setError("");
            await authenticate('google', authResponse.tokenObj);
        }
    };

    const authenticate = async (oidProvider, tokenObj) => {
        setError('');
        try {
           let user;
           if (oidProvider == 'local') {
                user = await login(loginInfo);
            } else {
                user = await addOpenIdUser(tokenObj);
            }
            console.log('LoginForm.authenticate.user: ', user);

            //Let the App component know (to enable components to rerender after login)
            // and redirect to requested page
            if (user) {
                console.log('User profile after login: ', user);
                redirectAfterLogin(user);
            } else {
                setError("Authentication failed 😱");
            }
        } catch (err) {
            console.log('LoginForm.authenticate: ', err);
            setError(`${err}`);
        }
    };

    const redirectAfterLogin = (user) => {
        //Let the App component know
        onLogin(user);

        let redirectTo = "/";
        if (location.state && location.state.from) {
            redirectTo = location.state.from;
        }

        history.push(redirectTo);
    };

    return (
        <>
            <div className="align-center">
                <img src={logo} className="logo" />
                <h3>Login</h3>
                <hr />
                <div>Login using: admin@jwt.org pass: secret.</div>
                <div>Or login using your Gmail account.</div>
                <div>Or signup using postman @ http://localhost:3040/auth/signup. Lazy to provide UI 🙄</div>
            </div>

            <form onSubmit={handleLocalLogin}>
                <label htmlFor='email'>Email</label>
                <input
                    name="email" id="email" placeholder="e-mail"
                    type="email" required
                    value={loginInfo.email}
                    onChange={handleChange}/>

                <label htmlFor='password'>Password</label>
                <input
                    name="password" id="password" placeholder="password"
                    type="password" required
                    value={loginInfo.password}
                    onChange={handleChange} />

                <button type="submit">Login</button>
            </form>
            <br />
            {error && <p className="text-danger">{error}</p>}
            <br />
            <div className="align-center">
                <GoogleLogin
                    clientId={googleClientId}
                    onSuccess={handleGoogleResponse}
                    onFailure={handleGoogleResponse}
                />
            </div>
        </>
    );
}

export default LoginForm;