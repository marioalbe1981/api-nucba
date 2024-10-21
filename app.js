document.getElementById('fetchPokemon').addEventListener('click', async () => {
    const pokemonId = document.getElementById('pokemonId').value;
    const pokemonCard = document.getElementById('pokemonCard');
    pokemonCard.innerHTML = '';

    if (pokemonId) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }

            const pokemon = await response.json();
            
            // Conversión de altura y peso
            const height = pokemon.height / 10; // Altura en metros
            const weight = pokemon.weight / 10; // Peso en kilogramos
            const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

            // Renderizar la card con los datos del Pokémon
            pokemonCard.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p><strong>Tipo:</strong> ${types}</p>
                <p><strong>Altura:</strong> ${height} m</p>
                <p><strong>Peso:</strong> ${weight} kg</p>
            `;
        } catch (error) {
            pokemonCard.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    } else {
        pokemonCard.innerHTML = '<p>Por favor, introduce un número válido.</p>';
    }
});
