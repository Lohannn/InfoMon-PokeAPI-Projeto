'use strict'

import { getPokemon } from "./fetchs.js";
import { getPokemonSpecie } from "./fetchs.js";

const grass = getComputedStyle(document.documentElement).getPropertyValue('--grass');
const fire = getComputedStyle(document.documentElement).getPropertyValue('--fire');
const water = getComputedStyle(document.documentElement).getPropertyValue('--water');
const bug = getComputedStyle(document.documentElement).getPropertyValue('--bug');
const ground = getComputedStyle(document.documentElement).getPropertyValue('--ground');
const rock = getComputedStyle(document.documentElement).getPropertyValue('--rock');
const dark = getComputedStyle(document.documentElement).getPropertyValue('--dark');
const ghost = getComputedStyle(document.documentElement).getPropertyValue('--ghost');
const fairy = getComputedStyle(document.documentElement).getPropertyValue('--fairy');
const fighting = getComputedStyle(document.documentElement).getPropertyValue('--fighting');
const steel = getComputedStyle(document.documentElement).getPropertyValue('--steel');
const poison = getComputedStyle(document.documentElement).getPropertyValue('--poison');
const psychic = getComputedStyle(document.documentElement).getPropertyValue('--psychic');
const dragon = getComputedStyle(document.documentElement).getPropertyValue('--dragon');
const ice = getComputedStyle(document.documentElement).getPropertyValue('--ice');
const normal = getComputedStyle(document.documentElement).getPropertyValue('--normal');
const electric = getComputedStyle(document.documentElement).getPropertyValue('--electric');
const flying = getComputedStyle(document.documentElement).getPropertyValue('--flying');

let getTypeColor = function (pokemon) {
    let type = pokemon.types[0].type.name
    let bgColor;

    switch (type.toLowerCase()) {
        case 'electric':
            bgColor = electric
            break;

        case 'grass':
            bgColor = grass
            break;

        case 'fire':
            bgColor = fire
            break;

        case 'water':
            bgColor = water
            break;

        case 'bug':
            bgColor = bug
            break;

        case 'poison':
            bgColor = poison
            break;

        case 'normal':
            bgColor = normal
            break;

        case 'fighting':
            bgColor = fighting
            break;

        case 'psychic':
            bgColor = psychic
            break;

        case 'flying':
            bgColor = flying
            break;

        case 'fairy':
            bgColor = fairy
            break;

        case 'steel':
            bgColor = steel
            break;

        case 'ice':
            bgColor = ice
            break;

        case 'rock':
            bgColor = rock
            break;

        case 'ground':
            bgColor = ground
            break;

        case 'dark':
            bgColor = dark
            break;

        case 'ghost':
            bgColor = ghost
            break;

        case 'dragon':
            bgColor = dragon
            break;


    }

    return bgColor;
}

const getPokemonId = async function (pokemonName) {
    let pokemon = await getPokemon(pokemonName.name)
    let id = pokemon.id.toString();

    if (id.length < 2) {
        id = `00${pokemon.id}`
    } else if (id.length < 3) {
        id = `0${pokemon.id}`
    }

    return id
}

export const buildPage = async () => {
    let selectedPokemon = await getPokemon(localStorage.getItem('pokemon'));
    let selectedPokemonSpecie = await getPokemonSpecie(localStorage.getItem('pokemon'));

    let primeiraLetra = selectedPokemon.name.slice(0, 1).toUpperCase()
    let resto = selectedPokemon.name.slice(1).toLowerCase()
    let pokeName = primeiraLetra + resto

    let info_container = document.getElementById('info-container')
    info_container.style.backgroundColor = getTypeColor(selectedPokemon) + 'c4'

    let pokemonPhoto = document.getElementById('pokemonPhoto')
    pokemonPhoto.style.background = `url(${selectedPokemon.sprites.other["official-artwork"].front_default}) no-repeat`
    pokemonPhoto.style.backgroundPosition = 'center'
    pokemonPhoto.style.backgroundSize = 'contain'

    let pokemonNumber = document.getElementById('number')
    pokemonNumber.textContent = `#${await getPokemonId(selectedPokemon)}`

    let pokemonName = document.getElementById('name')
    pokemonName.textContent = pokeName

    let pokemonSpecie = document.getElementById('specie')
    pokemonSpecie.textContent = selectedPokemonSpecie.specie

    let types = document.getElementById('types')

    selectedPokemon.types.forEach(type => {
        const typeCard = document.createElement('type-card')
        typeCard.type = type.type.name

        types.appendChild(typeCard)
    });
}