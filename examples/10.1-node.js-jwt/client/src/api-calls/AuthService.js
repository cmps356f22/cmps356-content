const WebApiBaseUrl = `http://${window.location.hostname}:3040/api/users`;

export async function login(user) {
    const url = `${WebApiBaseUrl}/login`;
    try {
        const response = await fetch(url, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        });
        //If authentication failed
        if (response.status == 401 || response.status == 403) {
            const responseJson = await response.json();
            throw `${response.status} ${responseJson.error}`;
        }

        //If other error occurs
        if (!response.ok) {
            throw response.statusText
        }

        const authResponse = await response.json();
        console.log(authResponse)

        //Store idToken in the local storage
        localStorage.id_token = authResponse.id_token;
        console.log('idToken: ', authResponse.id_token);

        return decodeJwt(authResponse.id_token);
    } catch (err) {
        throw err;
    }
}

export function clearAuthTokens() {
    delete localStorage.id_token;
    delete localStorage.access_token;
}

export async function addOpenIdUser(tokenObj) {
    //ToDo: We can add support for other OpenID Connect providers (e.g., Twitter and Facebook) for now only Google is supported
    try {
        console.log("addOpenIdUser.tokenObj: ", tokenObj);
        //If the user grants access then ask to server to get and store the user profile then return a jwt
        if (tokenObj && tokenObj.access_token) {
            console.log('id_token from Google', tokenObj.id_token);
            console.log('Decoded id_token from Google', decodeJwt(tokenObj.id_token));
            console.log('access_token from Google', tokenObj.access_token);

            const authResponse = await postOpenIdUser(tokenObj);

            //Store idToken in the local storage
            localStorage.id_token = authResponse.id_token;
            localStorage.access_token = tokenObj.access_token;
            console.log('id_token from Users Web API: ', authResponse.id_token);

            return decodeJwt(authResponse.id_token);
        } else {
            throw "Authentication failed 😱";
        }
    } catch (e) {
        console.log("addOpenIdUser.catch", e);
        throw e;
    }
}

async function postOpenIdUser(tokenObj) {
    const openIdProvider = tokenObj.idpId; //e.g. google
    const url = `${WebApiBaseUrl}/${openIdProvider}`;

    const response = await fetch(url, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tokenObj)
    });

    return await response.json()
}

export async function getUsers() {
    const url = WebApiBaseUrl;

    const headers = new Headers();
    const id_token = getIdToken();
    headers.append('Authorization', `Bearer ${id_token}`);

    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    });

    //If authorization failed
    if (response.status == 403 || response.status == 401) {
        const responseJson = await response.json();
        throw `${response.status} ${responseJson.error}`;
    }

    //If other error occurs
    if (!response.ok) {
        throw response.statusText
    }

    return await response.json();
}

function isGoogleAuth() {
    const user = getCurrentUser();
    return (user && user.oidProvider === "google");
}

function getUserDefaultUrl() {
    let defaultUrl = '/';
    const user = getCurrentUser();
    //By default redirect users to contacts if they login using Google
    if (isGoogleAuth()) {
        defaultUrl = "contacts";
    }
    //By default redirect admin users to users route upon login
    else if (user.role === 'Admin') {
        defaultUrl = "users";
    }

    return defaultUrl;
}

export function getCurrentUser() {
    if (localStorage.id_token) {
        //Decode to idToken to get the user object
        return decodeJwt(localStorage.id_token);
    }
    return null;
}

export function getAccessToken() {
    const accessToken = localStorage.access_token;
    console.log("getAccessToken", accessToken);
    if (accessToken) {
        return accessToken;
    } else {
        const e = {
            code: 401,
            status: "Unauthorized",
            error: "Access Token missing 😱"
        };
        throw `${e.code} ${e.status} ${e.error}`;
    }
}

function getIdToken() {
    const idToken = localStorage.id_token;
    if (idToken) {
        return idToken;
    } else {
        const e = {
            code: 401,
            status: "Unauthorized",
            error: "Id Token missing 😱"
        };
        throw `${e.code} ${e.status} ${e.error}`;
    }
}

export function decodeJwt(token) {
    if (!token) return token;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    } catch (e) {
    }
}