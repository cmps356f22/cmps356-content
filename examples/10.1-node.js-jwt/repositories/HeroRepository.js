const Hero = require('./HeroModel');

class HeroRepository {

    async initDb() {
        //If the heroes collections is empty then init the db with heroes.json
        //Uncomment the line below to empty Heroes collection and re-init DB
        await Hero.deleteMany({});
        const heroesCount = await this.getHeroesCount();
        console.log('Number of existing heroes:', heroesCount);
        if (heroesCount === 0) {
            await this.loadFromJsonFile();
        }
    }

    async loadFromJsonFile() {
        const fs = require('fs-extra');
        const path = require('path');
        const heroFilePath = path.join(__dirname, '../data/heroes.json' );
        const  heroes = await fs.readJson(heroFilePath);

        for (let hero of heroes) {
            await this.addHero(hero);
        }
    }

    getHeroes() {
        return Hero.find({})
    }

    getHeroesCount() {
        return Hero.countDocuments({});
    }

    getHero(heroId) {
        return Hero.findById(heroId);
    }

    addHero(newHero) {
        return Hero.create(newHero);
    }

    updateHero(hero) {
        const heroId = hero._id;
        delete hero._id;
        return Hero.updateOne({_id: heroId}, hero);
    }

    deleteHero(heroId) {
        return Hero.deleteOne({ _id : heroId });
        //return Hero.findByIdAndRemove(heroId);
    }

}

module.exports = new HeroRepository();