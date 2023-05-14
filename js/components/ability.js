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

class card extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.color = ''
        this.name = ''
        this.isHidden = false
    }

    static get observedAttributes() {
        return ['color', 'name', 'isHidden']
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

            .normalAbility{
                height: 58px;
                color: #000;
                background-color: ${this.color};
                border-radius: 15px;
                border: 2px solid #000;
                font-size: 2.5rem;
                font-weight: 600;
                padding-left: 100px;
                padding-right: 100px;
                display: grid;
                place-items: center;
            }
            
            .hiddenAbility{
                height: 58px;
                color: #000;
                background-color: ${this.color}80;
                border-radius: 15px;
                border: 2px solid #000;
                font-size: 2.5rem;
                font-weight: 600;
                display: grid;
                place-items: center;
                position: relative;
                overflow: hidden;
                padding-left: 100px;
                padding-right: 100px;
                display: grid;
                place-items: center;
            }
            
            .hidden{
                height: 100%;
                width: 40px;
                color: #000;
                font-size: 1.375rem;
                font-weight: 800;
                background-color: ${this.color};
                display: grid;
                padding-right: 5px;
                align-items: center;
                justify-items: end;
                position: absolute;
                right: calc(100% - 7%);
            }

            @media (max-width: 800px) {
                .normalAbility{
                    height: 35px;
                    color: #000;
                    background-color: ${this.color};
                    border-radius: 15px;
                    border: 2px solid #000;
                    font-size: 1rem;
                    font-weight: 600;
                    padding-left: 100px;
                    padding-right: 100px;
                    display: grid;
                    place-items: center;
                }
                
                .hiddenAbility{
                    height: 35px;
                    color: #000;
                    background-color: ${this.color}80;
                    border-radius: 15px;
                    border: 2px solid #000;
                    font-size: 1rem;
                    font-weight: 600;
                    display: grid;
                    place-items: center;
                    position: relative;
                    overflow: hidden;
                    padding-left: 100px;
                    padding-right: 100px;
                    display: grid;
                    place-items: center;
                }
                
                .hidden{
                    height: 100%;
                    width: 40px;
                    color: #000;
                    font-size: .9rem;
                    font-weight: 800;
                    background-color: ${this.color};
                    display: grid;
                    padding-right: 5px;
                    align-items: center;
                    justify-items: end;
                    position: absolute;
                    right: calc(100% - 7%);
                }
            }
        `

        return css
    }

    component() {
        let getCase = function (name) {
            let word = name;
            let splitWord = word.split(' ');
            let casedWord = '';

            for (let i = 0; i < splitWord.length; i++) {
                let primeiraLetra = splitWord[i].slice(0, 1).toUpperCase()
                let resto = splitWord[i].slice(1).toLowerCase()
                casedWord += ' ' + primeiraLetra + resto
            }
            return casedWord
        }

        const normalCard = document.createElement('div')
        normalCard.classList.add('normalAbility')
        const normalAbilityName = document.createElement('p')
        normalAbilityName.textContent = getCase(this.name).replace(/ /i, '')

        const hiddenCard = document.createElement('div')
        hiddenCard.classList.add('hiddenAbility')
        const hiddenCardTag = document.createElement('div')
        hiddenCardTag.classList.add('hidden')
        hiddenCardTag.textContent = 'H'
        const hiddenAbilityName = document.createElement('p')
        hiddenAbilityName.textContent = getCase(this.name).replace(/ /i, '')

        normalCard.append(normalAbilityName)
        hiddenCard.append(hiddenCardTag, hiddenAbilityName)

        if (this.isHidden === false) {
            return normalCard
        } else {
            return hiddenCard
        }
    }
}

customElements.define('ability-card', card)