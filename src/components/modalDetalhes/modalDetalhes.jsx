import { useState } from 'react'
import './modalDetalhes.css'



function ModalDetalhes({setModal, detalhes}){

    let habilidades = detalhes.abilities

    return (
        <div className='fundo' onClick={()=>setModal(false)}>
            <div className='modal' onClick={(e)=>e.stopPropagation()}>
                <button onClick={() => setModal(false)}>Fechar</button>
                <img src={detalhes.sprites.front_default} alt={detalhes.name}/>
                <h1>Nome: {detalhes.name}</h1>
                <h2>Tipos: {detalhes.types.map(t => t.type.name).join(', ')}</h2>
                <ul>
                    <li>Vida: {detalhes.stats[0].base_stat}</li>
                    <li>Ataque: {detalhes.stats[1].base_stat}</li>
                    <li>Ataque Especial: {detalhes.stats[3].base_stat}</li>
                    <li>Defesa: {detalhes.stats[2].base_stat}</li>
                    <li>Defesa Especial: {detalhes.stats[4].base_stat}</li>
                    <li>Peso: {detalhes.weight}</li>
                    <li>Altura: {detalhes.height}</li>
                </ul>
                <h4>Habilidades</h4>
                <ul>
                    {habilidades.map((habilidade, index)=>(
                        <li>{habilidade.ability.name}</li>
                    )
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ModalDetalhes