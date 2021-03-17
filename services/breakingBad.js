import axios from 'axios'
import Episode from '../models/episode'

const API_ENDPOINT = 'https://www.breakingbadapi.com/api';

function arrayIntersect(arr1, arr2) {
    return arr1.filter(value => arr2.includes(value));
}

let cache = null;

async function fetchData() {
    return new Promise(async (resolve, reject) => {
        if (cache === null) {
            return axios.get(API_ENDPOINT + '/episodes?series=Breaking+Bad').then((response) => {
                cache = response.data.map((episodeData) => {
                    const episode = new Episode();
                    episode.title = episodeData.title;
                    episode.season = episodeData.season;
                    episode.episode = episodeData.episode;
                    episode.characters = episodeData.characters;
                    return episode;
                });
                resolve(cache);
                return;
            })
        }

        resolve(cache);
    });

}

async function breakingBad(characters) {
    let episodes = await fetchData();

    if (!(characters instanceof Array)) {
        characters = [characters];
    }

    return episodes.filter((episode) => {
        return arrayIntersect(episode.characters, characters).length === characters.length;
    }).map((episode) => {
        return episode.getFullName();
    })
}

export {breakingBad}
