'use strict'

import '../router.js'

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

let getBackground = function (typeName) {
    let bgColor;

    switch (typeName.toLowerCase()) {
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

class card extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.type = 'electric'
    }

    static get observedAttributes() {
        return ['type']
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        this[attribute] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles() {
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

            .type-card{
                display: grid;
                place-items: center;
                width: 108.29px;
                height: 23px;
                background-color: ${getBackground(this.type)};
                border: 1.5px solid #000;
                border-radius: 15px;
                color: #000;
                font-size: 15px;
                font-weight: 800;
            }
        `

        return css
    }

    component() {
        let primeiraLetra = this.type.slice(0, 1).toUpperCase()
        let resto = this.type.slice(1).toLowerCase()

        const card = document.createElement('div')
        card.classList.add('type-card')
        const typeName = document.createElement('div')
        typeName.classList.add('typeName')
        typeName.textContent = primeiraLetra + resto

        card.append(typeName)

        return card
    }
}

customElements.define('type-card', card)