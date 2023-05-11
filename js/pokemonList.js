'use strict'

import { getGeneration } from "./fetchs.js";
import { getPokemon } from "./fetchs.js";

const list = async function(gen){
    let generation = await getGeneration(gen)
    let limit = generation.pokemon_species.length
    let pokeList = []

    for (let index = 0; index < limit; index++) {
        if(await getPokemon(generation.pokemon_species[index].name) !== 404){
            pokeList.push(generation.pokemon_species[index].name)
        } else {
            let pokemon = await getPokemon(generation.pokemon_species[index].url.replace(/https:|pokeapi.co|api|v2|pokemon-species|\//g, ''))

            pokeList.push(pokemon.name)
        }
        
    }

    return pokeList
}

const createPokemonCards =  (pokemon) => {
    const card = document.createElement('pokemon-card')
    card.name = pokemon

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

export const loadPokemon = async (gen) => {
  console.log('Funcionou');
    let pokeList = await list(gen)

    const container = await getContainer()
    const cards = pokeList.map(createPokemonCards)

    container.replaceChildren(...cards)
}