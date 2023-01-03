import {getContacts, deleteContact} from '../api-calls/ContactService'
import React, {useEffect, useState} from "react";
import GoogleLogin from "react-google-login";

export default function Contacts() {
    const googleClientId = "866457396346-piq09ek9kiofq9uspsnjulv1mu1v4s8k.apps.googleusercontent.com";
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');
    const [accessToken, setAccessToken] = useState(localStorage.access_token);

    const handleGoogleResponse = (authResponse) => {
        console.log("handleGoogleResponse.authResponse: ", authResponse);
        if (authResponse.error) {
            setError(`${authResponse.error}. ${authResponse.details || ""}`);
        } else {
            setError("");
            const access_token = authResponse.tokenObj.access_token;
            console.log('access_token from Google', access_token);
            localStorage.access_token = access_token;
            setAccessToken(access_token);
            //await authenticate('google', authResponse.tokenObj);
        }
    };

    //When the component is created then get the contacts using Google Web API
    useEffect(() => {
        setError('');
        getContacts().then(contacts => setContacts(contacts)).catch(e => {
            console.error(e);
            setError(e);
        })
    }, [accessToken]);


    const onDeleteContact = async (contactId) => {
        if (!confirm('Confirm Delete?')) {
            return;
        }

        try {
            setError('');
            await deleteContact(contactId);

            // Remove the deleted contact
            setContacts(contacts.filter(c => c.id != contactId));
        } catch (e) {
            console.error(e);
            setError(`${e.code} ${e.status}. ${e.message}`);
        }
    }

    return (
        <div>
            <h2>📇 Contacts</h2>
            {error &&
            <div>
                <p className="text-danger">
                    {error}
                </p>
                /*GoogleLogin has a small bug. Need to refresh the page to use the scope value*/
                <GoogleLogin
                    clientId={googleClientId}
                    scope="https://www.googleapis.com/auth/contacts"
                    onSuccess={handleGoogleResponse}
                    onFailure={handleGoogleResponse}
                />
                <span> and authorize Hero App to access your Google Contacts</span>
            </div>
            }

            {!error &&
            <p>User Postman to add a contact - too lazy to provide a UI 🙄</p>
            }
            <table>
                <tbody>
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td> {contact.name} </td>
                        <td> {contact.address} </td>
                        <td> {contact.email} </td>
                        <td> {contact.phone} </td>
                        <td><img src={contact.picture}/></td>
                        <td>
                            <span title="Delete contact" onClick={() => onDeleteContact(contact.id)}>
                                <i style={{color: "indianred"}} className="fas fa-minus-circle"></i>
                            </span>
                        </td>
                    </tr>)
                )}
                </tbody>
            </table>
        </div>
    );
}