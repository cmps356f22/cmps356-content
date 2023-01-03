let heroRepository = require('./HeroRepository');

heroRepository.getHeroes().then(heroes => {
    console.log("Heroes count: ", heroes.length);
}).catch( err => console.log(err) );

let heroId = 1;
heroRepository.getHero(heroId).then(hero => {
    console.log(hero);
}).catch( err => console.log(err) );
