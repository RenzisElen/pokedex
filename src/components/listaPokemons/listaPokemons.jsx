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
    //Recebe uma função pra carregar corretamente com a montagem da página sem problemas de sobrescrever do useState
    const [listaFavoritos, setListaFavoritos] = useState(carregarFavoritos)
    //Total de páginas de favoritos ou gerais para o componente de paginação
    const [qtdPaginas, setQtdPaginas] = useState(0)
    //Valor booleano para renderizar corretamente a lista de favoritos ou lista geral
    const [mostrandoFavoritos , setMostrandoFavoritos] = useState(false)
    //State com o pokemon selecionado pra renderizar corretamente o modal
    const [pokemonSelecionado, setPokemonSelecionado] = useState({})

    
    function handleFavoritar(id){

        //Handle que transforma os ids em numeros para organizar a lista corretamente
        setListaFavoritos(prev => {
            let novaLista;
            const idNumerico = Number(id);
            if (prev.includes(idNumerico)) {
                novaLista = prev.filter(item => item !== idNumerico);
            } else {
                novaLista = [...prev, idNumerico];
            }
            return novaLista.sort((a, b) => a - b);

        });

    }

    //Função para mudar o nome que será pesquisado, caso o campo esteja vazio atualiza a lista com a busca padrão por páginas
    function handlePesquisa(valor) {
        setPesquisa(valor)
        if(valor === "") {
            buscarPokemons(pagina, qtdPagina)
            setMostrandoFavoritos(false)
        }
    }

    function carregarFavoritos(){
        try{
            const favoritosSalvos = localStorage.getItem('listaFavoritos')
            return favoritosSalvos ? JSON.parse(favoritosSalvos) : []
        }
        catch(erro){
            console.log(`Erro ao carregar favoritos: ${err}`)
            return []
        }
    }

    function handleFiltrarFavoritos(){
        setPagina(1)
        if (mostrandoFavoritos){
            setMostrandoFavoritos(false)
            buscarPokemons(pagina, qtdPagina)
        }
        else{
            setMostrandoFavoritos(true)
            buscarPokemonsFavoritos()
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
            obterQtdPaginas()
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
            setMostrandoFavoritos(false)
            setQtdPaginas(1)
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
    async function buscarPokemonsFavoritos(){
       try{
            setQtdPaginas(Math.ceil(listaFavoritos.length / qtdPagina))
            setLoading(true)
            
            const pokemonsFavoritos = []
        
            //Busca detalhes dos ids de pokemon marcados como favoritos
            for (let i = pagina * qtdPagina - qtdPagina; i < qtdPagina * pagina; i++) {

                //If pra impedir que o loop de erro quando acabar a lista
                if (i >= listaFavoritos.length) {
                    break
                }

                const favoritoRequest = await fetch(`https://pokeapi.co/api/v2/pokemon/${listaFavoritos[i]}`)
                const favoritoResposta = await favoritoRequest.json()
                pokemonsFavoritos.push(favoritoResposta)
            }
    
            setListaPokemons(pokemonsFavoritos)
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
        obterQtdPaginas()
    
    }, [])

    //Atualiza os favoritos no localstorage sempre que um for alterado
    useEffect(()=>{

            localStorage.setItem('listaFavoritos', JSON.stringify(listaFavoritos))
            console.log(JSON.stringify(listaFavoritos))
    }
    ,[listaFavoritos])

    useEffect(()=>{
        if (!mostrandoFavoritos && pesquisa == ""){
            buscarPokemons(pagina, qtdPagina)
        }
        else if (mostrandoFavoritos){
            buscarPokemonsFavoritos()
        }
    }, [pagina, qtdPagina])


    return(
        <>
            {modalAberto && <ModalDetalhes setModal={setModalAberto} detalhes={pokemonSelecionado}/>}
            <div className="geral">
                <nav className="busca">
                    <input name="nome" onChange={(e)=>handlePesquisa(e.target.value)}></input>
                    <button onClick={()=>buscarPokemonsNome(pesquisa)}>Buscar</button>
                    <button onClick={()=>handleFiltrarFavoritos()}>{!mostrandoFavoritos ? "Mostrar Favoritos" : "Mostrar Todos"}</button>
                </nav>
                <Paginacao paginaAtual={pagina} qtdPaginas={qtdPaginas} setPagina={setPagina}/>
                <div className="cards">
                    {//Mostra o texto de carregando enquanto a requisição é processada
                    loading ? (<p>Carregando...</p>) : listaPokemons.length > 0 ?  (
                                            listaPokemons.map((pokemon, index) => ( 
                                                    <CardPokemon 
                                                        key={index}
                                                        isFavorito={listaFavoritos.includes(pokemon.id)}
                                                        handleFavoritar ={handleFavoritar} 
                                                        nome={pokemon.name}
                                                        id = {pokemon.id} 
                                                        //Percorrendo os tipos e usando um map com join para mostrar corretamente no card quando tem mais de um tipo
                                                        tipo={pokemon.types.map(t => t.type.name).join(' / ')} 
                                                        imagem={pokemon.sprites.front_default} 
                                                        //Passando a função de abrir modal com os parâmetros certos ao clicar no botão
                                                        mostrarDetalhes={() => mostrarDetalhes(pokemon)} 
                                                    />
                                            ))) : (<p>Nenhum pokémon encontrado</p>)
                    }
                </div>  
                <Paginacao paginaAtual={pagina} qtdPaginas={qtdPaginas} setPagina={setPagina}/>
            </div>
        </>
    )
}

export default ListaPokemons