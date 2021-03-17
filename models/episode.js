class Episode {
    constructor() {
        let episode,
            season,
            characters = []
        ;

        Object.defineProperties(
            this,
            {
                episode: {
                    get: () => {
                        return episode;
                    },
                    set: (val) => {
                        episode = parseInt(val);
                    }
                },
                season: {
                    get: () => {
                        return season;
                    },
                    set: (val) => {
                        season = parseInt(val);
                    }
                },
                characters: {
                    get: () => {
                        return characters;
                    },
                    set: (val) => {
                        if (!(val instanceof Array)) {
                            return;
                        }
                        characters.splice.apply(characters, [0, characters.length].concat(val));
                    }
                },
                title: {
                    writable: true // no magic in getter or setter
                }
            }
        )
    }

    getFullName() {
        return `S${String(this.season).padStart(2, '0')}${String(this.episode).padStart(2, '0')} - ${this.title}`;
    }
}

export default Episode