const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const userRepository = require('../repositories/UserRepository');

class AuthService {
    async signup(req, res) {
        console.log(req.body);
        try {
            const user = userRepository.addUser(req.body);
            console.log('router.post(/signup)', user);

            res.status(201).json({
                success: 'User created'
            });
        } catch (error) {
            res.status(500).json({error});
        }
    }

    async login(req, res) {
        try {
            const user = await userRepository.login(req.body.email, req.body.password);
            if (user) {
                //Generate JWT token using the secret key. Set the expiry to 2h
                const id_token = jwt.sign(user, "my-jwt-secret-key", { expiresIn: '2h' });
                return res.json({ id_token });
            }
        }
        catch (err) {
            console.log("Login", err);
            res.status(401).json({error: `Authentication failed. ${err}`});
        }
    }

    async addOpenIdUser(req, res) {
        try {
            const { id_token, access_token }  = req.body;
            const oidUser = jwt.decode(id_token);

            console.log("addOpenIdUser - Decoded oidUser: ", oidUser);
            console.log('addOpenIdUser - access_token', access_token);

            const  oidProvider = req.params.provider;
            switch (oidProvider) {
                case 'google':
                    //First check if the user already exists in the local users DB
                    let user = await userRepository.getOpenIdUser(oidUser.sub, oidProvider);
                    if (!user) {
                        //We can optionally get more details about the user using the access_token
                        // @ UserInfo EndPoint https://openidconnect.googleapis.com/v1/userinfo
                        //console.log("addOpenIdUser.accessToken:", access_token);
                        user = await this.getGoogleUserProfile(access_token);

                        user.oidProvider = oidProvider;
                        user.role = 'Contributor';
                        user = await userRepository.addUser(user);
                        console.log("addOpenIdUser.user: ", user);
                    }
                    console.log(user);
                    const id_token = jwt.sign(user, keys.jwt.secret, { expiresIn: '2h' });
                    return res.json({ id_token });
                    break;
            }
        }
        catch (err) {
            console.log("addOpenIdUser", err);
            res.status(401).json({
                error: `Authentication failed. ${err}`
            });
        }
    }

    async getGoogleUserProfile(accessToken) {
        const options = {
            headers: {"Authorization": `Bearer ${accessToken}`}
        };

        const openIdUrl = 'https://openidconnect.googleapis.com/v1/userinfo';
        const userOpenId = await axios.get(openIdUrl, options);
        return userOpenId.data;
    }

    //Only authenticated users can access this route
    async getUsers(req, res) {
        if (req.user.role === 'Admin') {
            const users = await userRepository.getUsers();
            res.json(users);
        } else {
            res.status(403).json({
                error: "Access denied"
            });
        }
    }

    //region Helper Functions

    //Middleware function to Check if the user is authenticated
    isAuthenticated(req, res, next) {
        let id_token = req.headers.authorization;
        console.log("received id_token: ", id_token);
        if (!id_token) {
            res.status(401).json({error: "Unauthorized. Missing JWT Token"});
            return;
        }

        try {
                id_token = id_token.split(" ")[1];
                //Decode and verify jwt token using the secret key
                const decodedToken = jwt.verify(id_token, keys.jwt.secret);
                //Assign the decoded token to the request to make the user details
                //available to the request handler
                req.user = decodedToken;
                console.log("decodedToken: ", decodedToken);
                next();
        } catch (e) {
            console.log("isAuthenticated", e);
            res.status(403).json({error: "Forbidden. Invalid JWT Token"});
        }
    }
    //endregion
}

module.exports = new AuthService();