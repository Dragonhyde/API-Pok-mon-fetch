document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const pokemonCardsContainer = document.getElementById('pokemon-cards');

    categorySelect.addEventListener('change', fetchPokemons);

    async function fetchPokemons() {
        const type = categorySelect.value;
        const url = `https://pokeapi.co/api/v2/type/${type}/`; 
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayPokemons(data.pokemon); 
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }

    function displayPokemons(pokemonList) {
        pokemonCardsContainer.innerHTML = ''; 

        pokemonList.forEach(async (entry) => {
            const pokemonData = await fetchPokemonData(entry.pokemon.url);
            const pokemonCard = createPokemonCard(pokemonData);
            pokemonCardsContainer.appendChild(pokemonCard);
        });
    }

    async function fetchPokemonData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    }

    function createPokemonCard(pokemon) {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
        `;
        return card;
    }
});