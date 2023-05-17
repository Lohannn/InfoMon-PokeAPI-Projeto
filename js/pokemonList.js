'use strict'

import { getGeneration } from "./fetchs.js";
import { getPokemon } from "./fetchs.js";

const list = async function (gen) {
  let generation = await getGeneration(gen)
  let limit = generation.pokemon_species.length
  let pokeList = []

  for (let index = 0; index < limit; index++) {
    if (await getPokemon(generation.pokemon_species[index].name) !== 404) {
      let pokemon = await getPokemon(generation.pokemon_species[index].name)
      pokeList.push(pokemon)
    } else {
      let pokemon = await getPokemon(generation.pokemon_species[index].url.replace(/https:|pokeapi.co|api|v2|pokemon-species|\//g, ''))

      pokeList.push(pokemon)
    }

  }

  let sortedList = pokeList.sort(function (a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
  });

  console.log(sortedList);
  return sortedList
}

const filterPokemon = async (valor, gen) => {
  let generation = await getGeneration(gen)
  let limit = generation.pokemon_species.length
  let pokeList = []
  let value = new RegExp(valor.toLowerCase(), 'g')

  for (let index = 0; index < limit; index++) {
    if (await getPokemon(generation.pokemon_species[index].name) !== 404) {
      let pokemon = await getPokemon(generation.pokemon_species[index].name)
      if (String(pokemon.name).match(value)) {
        pokeList.push(pokemon)
      }
    } else {
      let pokemon = await getPokemon(generation.pokemon_species[index].url.replace(/https:|pokeapi.co|api|v2|pokemon-species|\//g, ''))
      if (String(pokemon.name).match(value)) {
        pokeList.push(pokemon)
      }
    }

  }

  return pokeList
}

const createPokemonCards = (pokemon) => {
  const card = document.createElement('pokemon-card')
  card.pokemon = pokemon

  return card
}

function getContainer() {
  return new Promise((resolve) => {
    const checkContainer = () => {
      const container = document.getElementById('list-container');
      if (container) {
        resolve(container);
      } else {
        setTimeout(checkContainer, 100);
      }
    };
    checkContainer();
  });
}

const loadPokemon = async (list) => {
  const container = await getContainer()

  const cards = list.map(createPokemonCards)
  container.style.background = 'none'
  const inputPokemon = document.getElementById('buscadorPokemon')
  inputPokemon.removeAttribute('readonly')
  inputPokemon.setAttribute('placeholder', 'Procure um pokémon')

  container.replaceChildren(...cards)
}

export const iniatilizePokemon = async (gen) => {
  await loadPokemon(await list(gen))

  const searcher = document.getElementById('barra_pesquisa')
  const inputPokemon = document.getElementById('buscadorPokemon')
  inputPokemon.addEventListener('change', async () => {
    searcher.style.backgroundColor = '#FFF'
    inputPokemon.style.backgroundColor = '#FFF'
    let value = inputPokemon.value.replace(' ', '')
    if (value != '') {
      await loadPokemon(await filterPokemon(value, gen))
      searcher.style.backgroundColor = 'var(--primary-color)'
      inputPokemon.style.backgroundColor = 'var(--primary-color)'
    } else {
      await loadPokemon(await list(gen))
      searcher.style.backgroundColor = 'var(--primary-color)'
      inputPokemon.style.backgroundColor = 'var(--primary-color)'
    }
  })
}