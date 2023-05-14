'use strict'

import { iniatilizePage } from "./generationList.js";

const routes = {
    '/': '/pages/home.html'
}

const defaultPage = async () => {

    const path = window.location.pathname
    const response = await fetch(routes[path])
    const html = await response.text()

    document.getElementById('root').innerHTML = html

    iniatilizePage()
}

defaultPage()

import './router.js'