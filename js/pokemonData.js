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

const getTypeColor = function (pokemon) {
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

    let catchPokemonSpecie = async function (pokemonName) {
        let pokemon;

        if (await getPokemonSpecie(pokemonName) !== 404) {
            pokemon = await getPokemonSpecie(pokemonName)
        } else {
            pokemon = await getPokemonSpecie(selectedPokemon.id)
        }
        return pokemon
    }

    let selectedPokemonSpecie = await catchPokemonSpecie(localStorage.getItem('pokemon'))

    let getPokemonStats = function (pokemon) {
        let statsJSON = {};

        pokemon.stats.forEach(stat => {
            if (stat.stat.name == 'hp') {
                statsJSON.hp = stat.base_stat
            } else if (stat.stat.name == 'attack') {
                statsJSON.attack = stat.base_stat
            } else if (stat.stat.name == 'special-attack') {
                statsJSON.sp_attack = stat.base_stat
            } else if (stat.stat.name == 'defense') {
                statsJSON.defense = stat.base_stat
            } else if (stat.stat.name == 'special-defense') {
                statsJSON.sp_defense = stat.base_stat
            } else if (stat.stat.name == 'speed') {
                statsJSON.speed = stat.base_stat
            }
        });

        statsJSON.max_status = (statsJSON.hp + statsJSON.attack + statsJSON.sp_attack + statsJSON.defense + statsJSON.sp_defense + statsJSON.speed)

        return statsJSON
    }

    let primeiraLetra = selectedPokemon.name.slice(0, 1).toUpperCase()
    let resto = selectedPokemon.name.slice(1).toLowerCase()
    let pokeName = primeiraLetra + resto

    let info_container = document.getElementById('info-container')
    info_container.style.backgroundColor = getTypeColor(selectedPokemon) + 'c4'

    let photo = selectedPokemon.sprites.other["official-artwork"].front_default
    let shinyPhoto = selectedPokemon.sprites.other["official-artwork"].front_shiny

    let pokemonPhoto = document.getElementById('pokemonPhoto')
    pokemonPhoto.style.background = `url(${photo}) no-repeat`
    pokemonPhoto.style.backgroundPosition = 'center'
    pokemonPhoto.style.backgroundSize = 'contain'

    let shiny = document.getElementById('shiny')
    shiny.addEventListener('click', function () {
        if (photo == selectedPokemon.sprites.other["official-artwork"].front_default) {
            if (selectedPokemon.sprites.other["official-artwork"].front_shiny != null) {
                photo = selectedPokemon.sprites.other["official-artwork"].front_shiny
                pokemonPhoto.style.background = `url(${shinyPhoto}) no-repeat center`
                pokemonPhoto.style.backgroundPosition = 'center'
                pokemonPhoto.style.backgroundSize = 'contain'
            }
        } else if (photo == selectedPokemon.sprites.other["official-artwork"].front_shiny) {
            photo = selectedPokemon.sprites.other["official-artwork"].front_default
            pokemonPhoto.style.background = `url(${photo}) no-repeat`
            pokemonPhoto.style.backgroundPosition = 'center'
            pokemonPhoto.style.backgroundSize = 'contain'
        }
    })

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

    let pokemonDescriptionInfo = document.getElementById('pokemonDescription')
    pokemonDescriptionInfo.style.color = getTypeColor(selectedPokemon)

    let pokemonDescription = document.getElementById('description')
    pokemonDescription.textContent = selectedPokemonSpecie.description

    let weight = document.getElementById('weightValue')
    weight.textContent = `${parseFloat((selectedPokemon.weight)) / 10} KG`

    let height = document.getElementById('heightValue')
    height.textContent = `${parseFloat((selectedPokemon.height)) / 10} M`

    let pokemonCombatInfo = document.getElementById('pokemonCombatInfo')
    pokemonCombatInfo.style.color = getTypeColor(selectedPokemon)

    let statQuantity = document.getElementsByClassName('statQuantity')
    for (let index = 0, limit = statQuantity.length; index < limit; index++) {
        statQuantity[index].style.backgroundColor = getTypeColor(selectedPokemon);
    }

    let hp = document.getElementById('hp')
    let hpValue = document.getElementById('statNumber_hp')
    hp.style.width = `calc((100% * ${getPokemonStats(selectedPokemon).hp}/255) - 17%)`
    hpValue.textContent = getPokemonStats(selectedPokemon).hp

    let atk = document.getElementById('atk')
    let atkValue = document.getElementById('statNumber_atk')
    atk.style.width = `calc((100% * ${getPokemonStats(selectedPokemon).attack}/255) - 17%)`
    atkValue.textContent = getPokemonStats(selectedPokemon).attack

    let spa = document.getElementById('spa')
    let spaValue = document.getElementById('statNumber_spa')
    spa.style.width = `calc((100% * ${getPokemonStats(selectedPokemon).sp_attack}/255) - 17%)`
    spaValue.textContent = getPokemonStats(selectedPokemon).sp_attack

    let def = document.getElementById('def')
    let defValue = document.getElementById('statNumber_def')
    def.style.width = `calc((100% * ${getPokemonStats(selectedPokemon).defense}/255) - 17%)`
    defValue.textContent = getPokemonStats(selectedPokemon).defense

    let spd = document.getElementById('spd')
    let spdValue = document.getElementById('statNumber_spd')
    spd.style.width = `calc((100% * ${getPokemonStats(selectedPokemon).sp_defense}/255) - 17%)`
    spdValue.textContent = getPokemonStats(selectedPokemon).sp_defense

    let spe = document.getElementById('spe')
    let speValue = document.getElementById('statNumber_spe')
    spe.style.width = `calc((100% * ${getPokemonStats(selectedPokemon).speed}/255) - 17%)`
    speValue.textContent = getPokemonStats(selectedPokemon).speed

    let max = document.getElementById('max')
    let maxValue = document.getElementById('statNumber_max')
    max.style.width = `calc((100% * ${getPokemonStats(selectedPokemon).max_status}/1530) - 17%)`
    maxValue.textContent = getPokemonStats(selectedPokemon).max_status

    let moveButton = document.getElementById('moveButton')
    moveButton.style.backgroundColor = getTypeColor(selectedPokemon);
    moveButton.style.backgroundColor = getTypeColor(selectedPokemon);

    let ability_container = document.getElementById('abilityList')

    selectedPokemon.abilities.forEach(ability => {
        let abilityCard = document.createElement('ability-card')
        abilityCard.color = getTypeColor(selectedPokemon)
        abilityCard.name = ability.ability.name

        if (ability.is_hidden === false) {
            abilityCard.isHidden = false
        } else {
            abilityCard.isHidden = true
        }

        ability_container.appendChild(abilityCard)
    });
}