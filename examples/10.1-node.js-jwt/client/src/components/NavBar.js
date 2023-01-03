import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from "./imgs/logo.png";

export default function NavBar({isAuthenticated, user, onLogout, history, location}) {

    // Auto-run this function every time the isAuthenticated changes
    // If the user is NOT authenticated then redirect to login
    useEffect(() => {
        if (!isAuthenticated && location.pathname === '/') {
            console.log("NavBar.location", location);
            console.log("NavBar redirecting to /login because the user is not authenticated");
            history.push('/login');
        }
    }, [isAuthenticated]);

    const handleLogout = (e) => {
        e.preventDefault();
        onLogout();
        history.push("/");
    };

    if (!isAuthenticated) {
        return <></>;
    }

    return (
        <nav>
            <ul>
                <li>Heroes App</li>
                <li className="nav-item">
                    <img src={logo} className="logo" />
                </li>
                <li>
                    <Link to="/calculator">Calculator</Link>
                </li>
                <li>
                    <Link to="/heroes">Heroes</Link>
                </li>
                <li>
                    <Link to="/contacts">Contacts</Link>
                </li>
                {user && user.role === 'Admin' &&
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                }
                {isAuthenticated && user &&
                <span>
                    <i className="fas fa-user"></i>
                    Welcome {user.given_name}
                    (<a href="#" onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i>Logout</a>)
                </span> }
            </ul>
        </nav>
    )
}