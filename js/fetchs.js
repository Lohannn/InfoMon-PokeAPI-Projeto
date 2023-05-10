'use strict'

export const getGeneration = async function (id) {
    const url = `https://pokeapi.co/api/v2/generation/${id}`
    const response = await fetch(url)
    var data = await response.json()

    return data = {
        name: data.name,
        region: data.main_region.name.toUpperCase(),
        pokemon_species: data.pokemon_species
    }
}

export const getGenerationQuantity = async function () {
    const url = `https://pokeapi.co/api/v2/generation`
    const response = await fetch(url)
    var data = await response.json()

    return data = {
        count: data.count
    }
}

export const getPokemon = async function (nameOrId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`
    const response = await fetch(url)

    if (response.status !== 200) {
        return response.status
    } else {
        var data = await response.json()

        return data = {
            id: data.id,
            name: data.name,
            abilities: data.abilities,
            types: data.types,
            stats: data.stats,
            height: data.height,
            weight: data.weight,
            sprites: data.sprites,
            moves: data.moves
        }
    }

}

export const getPokemonSpecie = async function (pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`
    const response = await fetch(url)
    var data = await response.json()

    return data = {
        id: data.id,
        name: data.name,
        specie: data.genera,
        description: data.flavor_text_entries[0].flavor_text
    }
}