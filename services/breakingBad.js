import axios from 'axios'
import Episode from '../models/episode'

const API_BASE_URL = 'https://www.breakingbadapi.com/api';

function arrayIntersect(arr1, arr2) {
    return arr1.filter(value => arr2.includes(value));
}

const characters = ["Walter White", "Jesse Pinkman", "Skyler White", "Walter White Jr.", "Henry Schrader", "Marie Schrader", "Mike Ehrmantraut", "Saul Goodman", "Gustavo Fring", "Hector Salamanca", "Domingo Molina", "Tuco Salamanca", "Marco & Leonel Salamanca", "Lydia Rodarte-Quayle", "Todd Alquist", "Jane Margolis", "Skinny Pete", "Brandon Mayhew", "Huell Babineaux", "Steven Gomez", "Theodore Beneke", "Gale Boetticher", "Andrea Cantillo", "Brock Cantillo", "Carmen Molina", "Gretchen Schwartz", "Elliot Schwartz", "Gonzo", "Christian Ortgea", "Mrs. Pinkman", "Adam Pinkman", "Jake Pinkman", "No-Doze", "Emilio Koyama", "Dr. Delcavoli", "Wendy S.", "Bogdan Wolynetz", "Ken", "Holly White", "George Merkert", "Donald Margolis", "Clovis", "SAC Ramey", "Victor", "Tomás Cantillo", "Francesca Liddy", "Cynthia", "Tortuga", "Tim Roberts", "Juan Bolsa", "Group Leader", "Kaylee Ehrmantraut", "Pamela", "Duane Chow", "Stacey Ehrmantraut", "Officer Saxton", "Jack Welker", "Kimberly Wexler", "Howard Hamlin", "Charles McGill", "Ignacio Varga", "Eduardo Salamanca"];

let cache = null;

async function fetchData() {
    return new Promise((resolve) => {
        if (cache === null) {
            return axios.get(API_BASE_URL + '/episodes?series=Breaking+Bad').then((response) => {
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

    if (!characters.length) {
        return [];
    }

    return episodes.filter((episode) => {
        return arrayIntersect(episode.characters, characters).length === characters.length;
    }).map((episode) => {
        return episode.getFullName();
    })
}

export {breakingBad, characters}
