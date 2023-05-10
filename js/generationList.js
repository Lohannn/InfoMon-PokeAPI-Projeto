'use strict'

import { getGeneration } from "./fetchs.js";
import { getGenerationQuantity } from "./fetchs.js";

const list = async function(){
    let limit = await getGenerationQuantity()
    let genList = []

    for (let index = 1; index <= limit.count; index++) {
        let generation = await getGeneration(index)
        let gen = {}

        gen.name = generation.name
        gen.region = generation.region

        genList.push(gen)
    }

    return genList
}

const createGenerationCards =  (generation) => {
    const card = document.createElement('generation-card')
    card.name = generation.name
    card.region = generation.region

    return card
}

function getContainer() {
    return new Promise((resolve) => {
      const checkContainer = () => {
        const container = document.getElementById('generationList');
        if (container) {
          resolve(container);
        } else {
          setTimeout(checkContainer, 100);
        }
      };
      checkContainer();
    });
  }

export const loadCards = async () => {
    let genList = await list()

    const container = await getContainer()
    const cards = genList.map(createGenerationCards)

    container.replaceChildren(...cards)
}

loadCards()