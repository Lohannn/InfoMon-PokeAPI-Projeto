'use strict'

import { getGames } from "./fetchs.js";
import { getGameQuantity } from "./fetchs.js";

const list = async function(){
    let limit = await getGameQuantity()
    let gameList = []

    for (let index = 1; index < limit.count; index++) {
        let version = await getGames(index)
        let game = {}

        game.version = version.name
        game.generation = version.generation

        gameList.push(game)
    }

    return gameList
}

const createGameCards =  (game) => {
    const card = document.createElement('game-card')
    card.name = game.version.replace(/-/g, ' ')
    card.gen = game.generation

    return card
}

const loadCards = async () => {
    let gameList = await list()

    const container = document.getElementById('gameList')
    const cards = gameList.map(createGameCards)

    container.replaceChildren(...cards)
}

loadCards()