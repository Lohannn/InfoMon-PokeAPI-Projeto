'use strict'

import '../router.js'

import { getPokemon } from "../fetchs";

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

            .pokemon-card {
                width: 282px;
                height: 248px;
                background-color: ${};
                color: var(--principal-color);
                border: 2px solid var(--principal-color);
                border-radius: 10px;
                display: grid;
                place-items: center;
                transition: all .5s;
                font-size: 1.2rem;
                font-weight: 800;
            }
            
            .pokemon-icon{
                display: grid;
                place-items: center;
                width: 178px;
                height: 167px;
                border-radius: 100%;
                background: url(${}), rgba(0, 0, 0, 0.77);
                background-repeat: no-repeat;
                background-size: contain;
                border: 2px solid var(--principal-color);
            }
            
            .pokemon-types{
                display: flex;
                gap: 5px;
            }
        `

        return css
    }

    component() {
        const card = document.createElement('a')
        card.classList.add('game-card')
        card.addEventListener('click', route)
        card.href = '/pokemon'
        const infos = document.createElement('container')
        infos.classList.add('infos')
        infos.href = '/pokemon'
        const gameName = document.createElement('h2')
        gameName.classList.add('game-name')
        gameName.textContent = this.name.replace(/&/g, '')
        gameName.href = '/pokemon'
        const gameGen = document.createElement('h2')
        gameGen.classList.add('game-gen')
        gameGen.textContent = this.gen
        gameGen.href = '/pokemon'

        card.append(infos)
        infos.append(gameName, gameGen)

        return card
    }
}

customElements.define('game-card', card)