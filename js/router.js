'use strict'

import { iniatilizePage } from "./generationList.js";
import { iniatilizePokemon } from "./pokemonList.js";
import { buildPage } from "./pokemonData.js";

const routes = {
    '/': '/pages/home.html',
    '/pokemon-list': '/pages/pokemon.html',
    '/pokemon': '/pages/selectedPokemon.html'
}

const route = (e) => {
    e.preventDefault()
    window.history.pushState({}, "", e.target.href)
    handleLocation()
}

const handleLocation = async () => {
    const path = window.location.pathname
    const response = await fetch(routes[path])
    const html = await response.text()

    document.getElementById('root').innerHTML = html

    if (window.location.pathname == '/') {
        iniatilizePage()
    } else if (window.location.pathname == '/pokemon-list') {
        iniatilizePokemon(localStorage.getItem('generation'))
    } else if (window.location.pathname == '/pokemon') {
        buildPage()
    }
}

window.onpopstate = handleLocation
window.route = route

handleLocation()