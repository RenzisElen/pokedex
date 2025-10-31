import { useEffect, useState } from "react"
import CardPokemon from '.././cardPokemon/cardPokemon.jsx'
import ModalDetalhes from "../modalDetalhes/modalDetalhes.jsx"
import './listaPokemons.css'
import Paginacao from "../paginacao/paginacao.jsx"

function ListaPokemons(){

    //Declaração de states usados
    const [listaPokemons, setListaPokemons] = useState([])
    const [qtdPagina, setQtdPagina] = useState(20)
    const [pagina, setPagina] = useState(1)
    const [pesquisa, setPesquisa] = useState("")
    const [modalAberto, setModalAberto] = useState(false)
    const [loading, setLoading] = useState(false)
    const [favoritos, setFavoritos] = useState([])
    const [qtdPaginas, setQtdPaginas] = useState(0)

    const [pokemonSelecionado, setPokemonSelecionado] = useState({})

    
    //Função para mudar o nome que será pesquisado, caso o campo esteja vazio atualiza a lista com a busca padrão por páginas
    function handlePesquisa(valor) {
        setPesquisa(valor)
        if(valor === "") {
            buscarPokemons(pagina, qtdPagina)
        }
    }


    //Recebe objeto do pokemon do card clicado e define como selecionado para mostrar modal
    function mostrarDetalhes(pokemon){
        setPokemonSelecionado(pokemon)
        setModalAberto(true)

    }
    async function obterQtdPaginas() {
        const request = await fetch("https://pokeapi.co/api/v2/pokemon")
        const response = await request.json()

        const totalPokemons = response.count

        
        

        setQtdPaginas(Math.ceil(totalPokemons / qtdPagina))

        
    }

    async function buscarPokemons(pagina, qtdPagina) {
        try{
            setLoading(true)
            //Definição de onde começar para a página determinada
            let inicio = pagina * qtdPagina - qtdPagina
            const request = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${qtdPagina}&offset=${inicio}`)
            const response = await request.json()
          
            //Lista com os pokemons da página detalhados
            const pokemonsDetalhados = []
        
            //Busca detalhes de cada pokémon um por um, sem isso não tem como acessar as imagens para a listagem
            for (const pokemon of response.results) {
                const detalhadoRequest = await fetch(pokemon.url)
                const detalhadoResposta = await detalhadoRequest.json()
                pokemonsDetalhados.push(detalhadoResposta)
            }
    
            setListaPokemons(pokemonsDetalhados)
        }
        catch(error){
            console.log(error)
            setListaPokemons([])
        }
        finally{
            setLoading(false)
        }

    }
    async function buscarPokemonsNome(nome) {
        try{
            setLoading(true)
            const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
            const response = await request.json()
            setListaPokemons([response])

        }
        catch(error){
            console.log(error)
            setListaPokemons([])
        }
        finally{
            setLoading(false)
        }
    }

    //UseEffect para carregar inicialmente os favoritos salvos na memória do navegador em um estado
    useEffect(() => {
        try {
            const favoritosSalvos = localStorage.getItem('favoritos')
            if (favoritosSalvos) setFavoritos(JSON.parse(favoritosSalvos))
        } catch (err) {
            console.log(`Erro ao carregar favoritos ${err}`)
        }
         obterQtdPaginas()
    }, [])

    //Atualiza os favoritos no localstorage sempre que um for alterado
    useEffect(()=>{
            localStorage.setItem('favoritos', JSON.stringify(favoritos))
    }
    ,[favoritos])

    useEffect(()=>{
       
        buscarPokemons(pagina, qtdPagina)
    }, [pagina, qtdPagina])


    return(
        <>
            {modalAberto && <ModalDetalhes setModal={setModalAberto} detalhes={pokemonSelecionado}/>}
            <div className="geral">
                <input name="nome" onChange={(e)=>handlePesquisa(e.target.value)}></input>
                <button onClick={()=>buscarPokemonsNome(pesquisa)}>Buscar</button>
                <div className="cards">
                    {//Mostra o texto de carregando enquanto a requisição é processada
                    loading ? (<p>Carregando...</p>) : listaPokemons.length > 0 ?  (
                                            listaPokemons.map((pokemon, index) => ( 
                                                    <CardPokemon 
                                                        key={index} 
                                                        nome={pokemon.name} 
                                                        //Percorrendo os tipos e usando um map com join para mostrar corretamente no card quando tem mais de um tipo
                                                        tipo={pokemon.types.map(t => t.type.name).join(' / ')} 
                                                        imagem={pokemon.sprites.front_default} 
                                                        //Passando a função de abrir modal com os parâmetros certos ao clicar no botão
                                                        mostrarDetalhes={() => mostrarDetalhes(pokemon)} 
                                                    />
                                            ))) : (<p>Nenhum pokémon encontrado</p>)
                    }
                </div>
                <nav>
                    <button onClick={() => setPagina(1)} disabled={pagina === 1}>Inicio</button>
                    <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>Anterior</button>
                    <button onClick={() => setPagina(pagina + 1)}>Próxima</button>
                    <button onClick={() => setPagina(pagina + 1)}>Ultima</button>
                </nav>
                <Paginacao paginaAtual={pagina} qtdPaginas={qtdPaginas} setPagina={setPagina}/>
            </div>
        </>
    )
}

export default ListaPokemons