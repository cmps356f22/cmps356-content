import {getUsers} from '../api-calls/AuthService'
import React, {useState, useEffect} from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    //When the component is created then get users
    useEffect(() => {
            setError('');
            getUsers().then(users => setUsers(users)).catch(e => {
                console.log(e);
                setError(`${e}😱`);
            });
    }, []);

    return (
        <div>
            <h2>📇 Users</h2>
            {error && <p className="text-danger">{error}</p>}

            {!error &&
                <>
                    <p>Too lazy to provide a UI 🙄</p>
                    <pre> {JSON.stringify(users, null, 2)}</pre>
                </>
            }
        </div>
    );
}