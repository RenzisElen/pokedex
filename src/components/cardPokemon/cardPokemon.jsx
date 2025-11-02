import './cardPokemon.css'

function CardPokemon({nome, tipo, imagem, mostrarDetalhes, isFavorito, handleFavoritar, id}) {

    return (
<div className='card'>
    <img src={imagem} alt="Pokemon Image" />
    <h2>Nome: {nome}</h2>
    <p>Tipo: {tipo}</p>
    <button onClick={mostrarDetalhes}>Mais detalhes</button>
    {isFavorito ? (<button onClick={() => handleFavoritar(id)}>⭐</button>) : <button onClick={() => handleFavoritar(id)}>☆</button>}
    
</div>

    )
}

export default CardPokemon