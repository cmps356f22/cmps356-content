const express = require('express');
const router = express.Router();

const heroService = require('./services/HeroService');
const authService = require('./services/AuthService');

//Heroes Web API
router.route('/heroes')
    .get( heroService.getHeroes )
    .post( heroService.addHero );

router.route('/heroes/:id')
    .get( heroService.getHero )
    .put( heroService.updateHero )
    .delete( heroService.deleteHero );

router.post('/users/login', authService.login);
router.post('/users', authService.signup);
router.post('/users/:provider', (req, res) => authService.addOpenIdUser(req, res));

//Only authenticated users can access this route
router.get('/users', authService.isAuthenticated, (req, res) => authService.getUsers(req, res));

module.exports = router;