import { useEffect, useState } from "react"
import CardPokemon from '.././cardPokemon/cardPokemon.jsx'
import ModalDetalhes from "../modalDetalhes/modalDetalhes.jsx"

function ListaPokemons(){

    //Declaração de states usados
    const [listaPokemons, setListaPokemons] = useState([])
    const [qtdPagina, setQtdPagina] = useState(20)
    const [pagina, setPagina] = useState(1)
    const [pesquisa, setPesquisa] = useState("")

    async function buscarPokemons(pagina, qtdPagina) {
        //Definição de onde começar para a página determinada
        let inicio = pagina * qtdPagina - qtdPagina
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${qtdPagina}&offset=${inicio}`)
        const response = await request.json()
        setListaPokemons(response.results)
    }
    async function buscarPokemonsNome(nome) {
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        const response = await request.json()
        //Retornando array para manter o mesmo formato na hora do map
        setListaPokemons([response])
    }

    useEffect(()=>{
        buscarPokemons(pagina, qtdPagina, pesquisa)
    }, [pagina, qtdPagina])


    return(
        <>
            <ModalDetalhes/>
            <input name="nome" onChange={(e)=>setPesquisa(e.target.value)}></input>
            <button onClick={()=>buscarPokemonsNome(pesquisa)}>Buscar</button>
            {listaPokemons.map((pokemon, index) => (
            <CardPokemon key={index} nome={pokemon.name} tipo={pokemon.type} imagem={pokemon.image} />
            ))}
            <nav>
                <button onClick={() => setPagina(1)} disabled={pagina === 1}>Inicio</button>
                <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>Anterior</button>
                <button onClick={() => setPagina(pagina + 1)}>Próxima</button>
            </nav>
        </>
    )
}

export default ListaPokemons