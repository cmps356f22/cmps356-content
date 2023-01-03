const WebApiBaseUrl = `http://${window.location.hostname}:3040/api/heroes`;

export async function getHeroes() {
    const url = WebApiBaseUrl;
    const response = await fetch(url);
    return await response.json()
}

export async function getHero(heroId) {
    const url = `${WebApiBaseUrl}/${heroId}`;
    const response = await fetch(url);
    return await response.json();
}

export async function addHero(hero) {
    const url = WebApiBaseUrl;
    //console.log("HeroService.addHero", url, hero);
    try {
        const response = await fetch(url, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(hero)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

export async function updateHero(hero) {
    const url = `${WebApiBaseUrl}/${hero._id}`;
    console.log(url);
    try {
        await fetch(url, {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(hero)
        });
    } catch (err) {
        console.error(err);
    }
}

export async function deleteHero(heroId) {
    const url = `${WebApiBaseUrl}/${heroId}`;
    console.log(url);
    try {
        await fetch(url, {method: "delete"});
    } catch (err) {
        console.log(err);
    }
}