'use strict'

export const getGenerationsList = async function(){
    const url = `https://pokeapi.co/api/v2/generation`
    const response = await fetch(url)
    const data = await response.json()

    return data ={
        count: data.count,
        results: data.results
    }
}

export const getGenerationGames = async function(GeneratiorNumber){
    const url = `https://pokeapi.co/api/v2/generation/${GeneratiorNumber}/`
    const response = await fetch(url)
    const data = await response.json()

    return data = {
        id: data.id,
        version_groups: data.version_groups
    }
}