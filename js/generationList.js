'use strict'

import { getGeneration } from "./fetchs.js";
import { getGenerationQuantity } from "./fetchs.js";

const list = async function () {
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

const createGenerationCards = (generation) => {
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

const loadCards = async (genList) => {
  const container = await getContainer()
  const cards = genList.map(createGenerationCards)

  container.replaceChildren(...cards)
}

const filterGeneration = async (valor) => {
  let limit = await getGenerationQuantity()
  let genList = []
  let value = new RegExp(valor.toLowerCase(), 'g')

  for (let index = 1; index <= limit.count; index++) {
    let generation = await getGeneration(index)
    if ((generation.region.toLowerCase()).match(value)) {
      let gen = {}

      gen.name = generation.name
      gen.region = generation.region

      genList.push(gen)
    }
  }

  return genList
}

export const iniatilizePage = async () => {
  loadCards(await list())

  const generationInput = document.getElementById('buscador')
  generationInput.addEventListener('input', async () => {
    let value = generationInput.value.replace(' ', '')
    if(value != ''){
      loadCards(await filterGeneration(value))
    } else {
      loadCards(await list())
    }
  })
}