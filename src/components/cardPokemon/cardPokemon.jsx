import './cardPokemon.css'

function CardPokemon({nome, tipos, imagem, mostrarDetalhes, isFavorito, handleFavoritar, id}) {

    return (
<div className='card'>
    <img src={imagem ? imagem : "/default.png"} alt={nome}/>
    <h2>{nome}</h2>
    <div className="card-tipos">
      {tipos.map(tipo => (
          <span className={`tipo ${tipo.type.name}`}>
            {tipo.type.name}
          </span>
      ))}
    </div>
    <button className="detalhes-btn" onClick={mostrarDetalhes}>Mais detalhes</button>
    <button className="favorito-btn" onClick={() => handleFavoritar(id)}>{isFavorito ? '⭐' : '☆'}</button>
    
</div>

    )
}

export default CardPokemon