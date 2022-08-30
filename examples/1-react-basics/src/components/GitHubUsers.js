//Source: https://scotch.io/tutorials/getting-started-with-react-hooks
import React, { useState, useEffect } from "react";

function GitHubUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const url = "https://api.github.com/users";
            const response = await fetch(url);
            const data = await response.json();
            setUsers(data); // set users in state
        }
        fetchData();
    }, []); // pass empty array to run this effect once when the component is first mounted to the DOM.

    return (
        <>
            <h3>GitHub users</h3>
            <ul>
                {users.map(user =>
                    <li key={user.id}>
                        {user.login}
                        <br />
                        <img src={user.avatar_url} className="avatarImage"/>
                    </li>
                )}
            </ul>
        </>
    );
}

export default GitHubUsers;