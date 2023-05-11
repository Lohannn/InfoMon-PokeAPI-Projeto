'use strict'

import '../router.js'

import { getPokemon } from "../fetchs.js";

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

const getBackground = async function (pokemonName) {
    let pokemon = await getPokemon(pokemonName)
    let bgColor;

    switch (pokemon.types[0].type.name) {
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

const getPokemonIcon = async function (pokemonName) {
    let pokemon = await getPokemon(pokemonName)
    let icon;

    if (pokemon.sprites.front_default != null) {
        icon = pokemon.sprites.front_default
    } else if(pokemon.sprites.other["official-artwork"].front_default != null){
        icon = pokemon.sprites.other["official-artwork"].front_default
    } else {
        icon = '/img/sem-imagem.png'
    }

    return icon
}

const getPokemonId = async function (pokemonName) {
    let pokemon = await getPokemon(pokemonName)
    let id = pokemon.id.toString();

    if (id.length < 2) {
        id = `00${pokemon.id}`
    } else if (id.length < 3) {
        id = `0${pokemon.id}`
    }

    return id
}

class card extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.name = 'bulbasaur'
    }

    static get observedAttributes() {
        return ['name']
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        this[attribute] = newValue
    }

    async connectedCallback() {
        this.shadow.appendChild(await this.component())
        this.shadow.appendChild(await this.styles())
    }

    async styles() {
        const css = document.createElement('style')
        css.textContent = `
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            a{
                text-decoration: none;
            }

            .pokemon-card {
                width: 282px;
                height: 280px;
                max-width: 282px;
                max-height: 280px;
                background-color: ${await getBackground(this.name)}c4;
                color: var(--principal-color);
                border: 2px solid var(--principal-color);
                border-radius: 10px;
                display: grid;
                place-items: center;
                transition: all .5s;
                font-size: 1.2rem;
                font-weight: 800;
            }

            .pokemon-card:hover {
                background-color: var(--principal-color);
                color: #000;
            }

            .pokemon-card:hover .pokemon-icon{
                border: 5px solid #000;
            }

            .pokemon-name{
                text-align: center;
            }
            
            .pokemon-icon{
                display: grid;
                place-items: center;
                width: 178px;
                max-width: 178px;
                height: 167px;
                max-height: 167px;
                border-radius: 100%;
                background: url(${await getPokemonIcon(this.name)}), rgba(0, 0, 0, 0.77);
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                border: 2px solid var(--principal-color);
                transition: all .5s;
            }
            
            .pokemon-types{
                display: flex;
                gap: 5px;
            }
        `

        return css
    }

    async component() {
        let pokemon = await getPokemon(this.name)

        let primeiraLetra = this.name.slice(0, 1).toUpperCase()
        let resto = this.name.slice(1).toLowerCase()
        let pokeName = primeiraLetra + resto

        const card = document.createElement('a')
        card.classList.add('pokemon-card')
        card.addEventListener('click', (e) => {
            localStorage.setItem('pokemon', this.name)
            route(e)
        })
        card.href = '/pokemon'
        const pokemonName = document.createElement('h2')
        pokemonName.classList.add('pokemon-name')
        pokemonName.textContent = `#${await getPokemonId(this.name)} - ${pokeName.replace(/-/g, ' ')}`
        pokemonName.href = '/pokemon'
        const pokemonIcon = document.createElement('div')
        pokemonIcon.classList.add('pokemon-icon')
        pokemonIcon.href = '/pokemon'
        const pokemonTypes = document.createElement('div')
        pokemonTypes.classList.add('pokemon-types')
        pokemonTypes.href = '/pokemon'

        card.append(pokemonName, pokemonIcon, pokemonTypes)

        pokemon.types.forEach(type => {
            const typeCard = document.createElement('type-card')
            typeCard.type = type.type.name

            pokemonTypes.appendChild(typeCard)
        });

        return card
    }
}

customElements.define('pokemon-card', card)