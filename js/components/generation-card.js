'use strict'

import '../router.js'

const simpleGenerationName = (generation_name) => {
    let name = generation_name.split('-')
    let simplifiedName = name[0].slice(0, 3).toUpperCase()
    return `${simplifiedName} ${name[1].toUpperCase()}`
}

class card extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.name = ''
        this.region = ''
    }

    static get observedAttributes() {
        return ['name', 'region']
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

            .generation-card {
                width: 282px;
                height: 248px;
                background-color: var(--primary-color);
                color: var(--principal-color);
                border: 2px solid var(--principal-color);
                border-radius: 10px;
                display: grid;
                place-items: center;
                transition: all .5s;
            }

            .generation-card:hover{
                color: var(--secondary-color);
                background-color: var(--principal-color);
            }
            
            .infos {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            
            .generation-name {
                font-weight: 700;
                font-size: 2rem;
            }
            
            .generation-region {
                font-weight: 800;
                font-size: 2rem;
            }

            @media (max-width: 800px) {
                .generation-card{
                    width: 92vw;
                }
            }
        `

        return css
    }

    component() {
        const card = document.createElement('a')
        card.classList.add('generation-card')
        card.addEventListener('click', (e) => {
            localStorage.setItem('generation', this.name)
            route(e)
        })
        card.href = '/pokemon-list'
        const infos = document.createElement('container')
        infos.classList.add('infos')
        infos.href = '/pokemon-list'
        const generationName = document.createElement('h2')
        generationName.classList.add('generation-name')
        generationName.textContent = simpleGenerationName(this.name)
        generationName.href = '/pokemon-list'
        const generationRegion = document.createElement('h2')
        generationRegion.classList.add('generation-region')
        generationRegion.textContent = this.region
        generationRegion.href = '/pokemon-list'

        card.append(infos)
        infos.append(generationName, generationRegion)

        return card
    }
}

customElements.define('generation-card', card)