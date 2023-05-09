'use strict'

import { loadCards } from "./gameList.js";

const routes = {
    '/': '/pages/home.html',
    '/pokemon': '/pages/pokemonList.html'
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
    }
}

window.route = route