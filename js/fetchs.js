'use strict'

const simpleGenerationName = (generation_name) => {
    let name = generation_name.split('-')
    let simplifiedName = name[0].slice(0, 3).toUpperCase()
    return `${simplifiedName} ${name[1].toUpperCase()}`
}

export const getGames = async function(id){
    const url = `https://pokeapi.co/api/v2/version-group/${id}`
    const response = await fetch(url)
    var data = await response.json()

    return data = {
        name: data.name,
        generation: simpleGenerationName(data.generation.name)
    }
}

export const getGameQuantity = async function(){
    const url = `https://pokeapi.co/api/v2/version-group/`
    const response = await fetch(url)
    var data = await response.json()

    return data = {
        count: data.count
    }
}