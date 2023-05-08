'use strict'

class card extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.name = ''
        this.gen = ''
    }

    static get observedAttributes() {
        return ['name', 'gen']
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

            .game-card {
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

            .game-card:hover{
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
            
            .game-name {
                font-weight: 700;
                font-size: 2rem;
            }
            
            .game-gen {
                font-weight: 800;
                font-size: 2rem;
            }
        `

        return css
    }

    component() {
        const card = document.createElement('a')
        card.classList.add('game-card')
        const infos = document.createElement('container')
        infos.classList.add('infos')
        const gameName = document.createElement('h2')
        gameName.classList.add('game-name')
        gameName.textContent = this.name
        const gameGen = document.createElement('h2')
        gameGen.classList.add('game-gen')
        gameGen.textContent = this.gen

        card.append(infos)
        infos.append(gameName, gameGen)

        return card
    }
}

customElements.define('game-card', card)