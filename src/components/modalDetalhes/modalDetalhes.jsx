import { useState } from 'react'
import './modalDetalhes.css'



function ModalDetalhes({setModal}){


    return (
        <div className='fundo' onClick={()=>setModal(false)}>
            <div className='modal'>
                <img src="" alt="Imagem pokemon"/>
                <h1>Nome: </h1>
                <h2>Tipos: </h2>
                <ul>
                    <li>Vida: </li>
                    <li>Ataque: </li>
                    <li>Peso: </li>
                    <li>Altura: </li>
                </ul>
            </div>
        </div>
    )
}

export default ModalDetalhes