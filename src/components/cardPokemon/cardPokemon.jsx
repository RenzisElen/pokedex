import './cardPokemon.css'

function CardPokemon({nome, tipo, imagem}) {
    return (
<div className='card'>
    <img src={imagem} alt="Pokemon Image" />
    <h2>Nome: {nome}</h2>
    <p>Tipo: {tipo}</p>
</div>

    )
}

export default CardPokemon