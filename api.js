export class Api {
    fetchPokemons = async (options) => {
        const response = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons?${this.stringify(options)}`);
        const data = await response.json();

        return data;
    }

    fetchDamage = async (options) => {
        const response = await fetch(`https://reactmarathon-api.netlify.app/api/fight?${this.stringify(options)}`);
        const data = await response.json();

        return data;
    }

    stringify(obj = {}) {
        return Object.entries(obj).reduce((acc, [key, value]) => acc += `&${key}=${value}`, '');
    }
}
