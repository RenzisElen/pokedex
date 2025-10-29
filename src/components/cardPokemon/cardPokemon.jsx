import './cardPokemon.css'

function CardPokemon({nome, tipo, imagem, mostrarDetalhes}) {
    return (
<div className='card'>
    <img src={imagem} alt="Pokemon Image" />
    <h2>Nome: {nome}</h2>
    <p>Tipo: {tipo}</p>
    <button onClick={mostrarDetalhes}>Mais detalhes</button>
    <button>⭐</button>
</div>

    )
}

export default CardPokemon