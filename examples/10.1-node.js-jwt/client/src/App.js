import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Calculator from "./components/Calculator";
import Contacts from "./components/Contacts";
import Heroes from "./components/Heroes";
import {getCurrentUser, clearAuthTokens} from './api-calls/AuthService'


export default function App() {
    const [user, setUser] = useState(getCurrentUser());
    const [isAuthenticated, setIsAuthenticated] = useState(user !== null);

    const handleLogin = (user) => {
        setIsAuthenticated(true);
        setUser(user);

        console.log("App.user", user);
        console.log("App.isAuthenticated", isAuthenticated);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        clearAuthTokens();
    };

    return (
        <Router>
            <Route path="/login"
                   render={(props) => {
                       return <LoginForm onLogin={handleLogin}
                                         {...props} />
                   }}
            />
            <Route path="/"
                   render={(props) => {
                       return <NavBar user={user}
                                      isAuthenticated={isAuthenticated}
                                      onLogout={handleLogout}
                                      {...props} />
                   }}
            />

            <Switch>

                <Route path="/calculator" component={Calculator} />

                <ProtectedRoute path="/heroes" component={Heroes}
                                isAuthenticated={isAuthenticated}
                                user={user} />

                <ProtectedRoute path="/users" component={Users}
                                isAuthenticated={isAuthenticated}
                                user={user}
                                authorizedRoles={["Admin"]} />

                <ProtectedRoute path="/contacts" component={Contacts}
                                isAuthenticated={isAuthenticated}
                                user={user} />

            </Switch>

        </Router>
    )
}