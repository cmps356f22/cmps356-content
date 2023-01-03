const heroRepository = require('../repositories/HeroRepository');

class HeroService {
    async getHeroes(req, res) {
        try {
            const heroes = await heroRepository.getHeroes();
            res.json(heroes);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async getHero (req, res) {
        try {
            const heroId = req.params.id;
            //console.log('getHero.req.params.id', heroId);
            const hero = await heroRepository.getHero(heroId);
            res.json(hero);
        }
        catch (err) {
            const errMessage = {errorMessage: err};
            res.status(404).json(errMessage);
        }
    }

    async addHero(req, res) {
        try {
            let hero = req.body;
            hero = await heroRepository.addHero(hero);
            const urlOfNewHero = `/api/heroes/${hero.id}`;
            res.location(urlOfNewHero);
            res.status(201).json(hero);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async updateHero(req, res) {
        try {
            const hero = req.body;
            //console.log("updateHero", hero);
            await heroRepository.updateHero(hero);
            res.status(200).send("ok");
        }
        catch (err) {
            res.status(500).send(err);
        }
    }

    async deleteHero(req, res) {
        try {
            const heroId = req.params.id;

            console.log("deleteHero", req.params.id);

            await heroRepository.deleteHero(heroId);
            res.status(200).send("ok");
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new HeroService();