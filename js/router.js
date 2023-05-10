'use strict'

import { loadCards } from "./generationList.js";
import { loadPokemon } from "./pokemonList.js";

const routes = {
    '/': '/pages/home.html',
    '/pokemon-list': '/pages/pokemon.html'
}

const route = async (e) => {

    e.preventDefault()
    window.history.pushState({}, "", e.target.href)

    const path = window.location.pathname

    const response = await fetch(routes[path])
    const html = await response.text()

    document.getElementById('root').innerHTML = html

    if (window.location.pathname == '/') {
        loadCards()
    } else if (window.location.pathname == '/pokemon-list') {
        loadPokemon(localStorage.getItem('generation'))
    }
}

window.route = route