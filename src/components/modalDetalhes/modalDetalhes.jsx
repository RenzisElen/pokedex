import { useState } from 'react'
import './modalDetalhes.css'



function ModalDetalhes({setModal, detalhes}){

    let habilidades = detalhes.abilities

    return (
        <div className='fundo' onClick={()=>setModal(false)}>
            <div className='modal' onClick={(e)=>e.stopPropagation()}>
                <button className='fechar-btn' onClick={() => setModal(false)}>X</button>
                <img src={detalhes.sprites.front_default ? detalhes.sprites.front_default : "/default.png"} alt={detalhes.name}/>
                <h1>{detalhes.name}</h1>
                <div className="modal-tipos">
                    {detalhes.types.map(objTipo => (
                        <span 
                          key={objTipo.type.name} 
                          className={`tipo ${objTipo.type.name}`}
                        >
                            {objTipo.type.name}
                        </span>
                    ))}
                </div>
                <ul>
                    <li>Vida: {detalhes.stats[0].base_stat}</li>
                    <li>Ataque: {detalhes.stats[1].base_stat}</li>
                    <li>Ataque Especial: {detalhes.stats[3].base_stat}</li>
                    <li>Defesa: {detalhes.stats[2].base_stat}</li>
                    <li>Defesa Especial: {detalhes.stats[4].base_stat}</li>
                    <li>Peso: {detalhes.weight / 10} kg</li>
                    <li>Altura: {detalhes.height / 10} m</li>
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