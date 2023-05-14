'use strict'

import { iniatilizePage } from "./generationList.js";
import { getGenerationQuantity } from "./fetchs.js";
import { getGeneration } from "./fetchs.js";

for (let index = 0; index < await getGenerationQuantity().count; index++) {
    await getGeneration(index)
}

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