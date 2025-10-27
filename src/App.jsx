import { useState, useEffect } from 'react'
import './App.css'
import CardPokemon from './components/cardPokemon/cardPokemon.jsx'

function App() {
  const [listaPokemons, setListaPokemons] = useState([])

  useEffect(()=>{
    async function buscarPokemons() {
      const request = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      const response = await request.json()
      console.log(response)
      setListaPokemons(response.results)
    }
    buscarPokemons()
  }, [])



  return (
    <>
    <h1>Inicio</h1>
    {listaPokemons.map((pokemon, index) => (
      <CardPokemon key={index} nome={pokemon.name} tipo={pokemon.type} imagem={pokemon.image} />
    ))}
  </> 
  )
}

export default App
