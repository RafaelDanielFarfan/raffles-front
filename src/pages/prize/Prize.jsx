import React from 'react'
import './prize.scss'

const Prize = () => {
  return (
    <article className='prize__article'>
    <h2 className='prize__title'>RIFA DE 100$</h2>    
    {/* <p>Descripción y Características del Sorteo</p> */}
    <div>
      <ul>
        <li>Total de tickets: 1000</li>
        <li>Valor de cada ticket: Venezuela: 100Bs  |  DOLAR: $3USD   </li>
        <li>Fecha del sorteo: 31/08/2023</li>
        <li>Hora del sorteo: 10:15 PM</li>
        <li>Lotería: <a style={{color:'#FFBF00'}} href="https://resultadodelaloteria.com/colombia/dorado-noche" target="_blank" rel="noopener noreferrer">Dorado Noche</a></li>
        <li>Juega con las 3 ultimas cifras de la loteria</li>
      </ul>
      <br />

      <h2 className='prize__title'>¿Cómo participar?</h2>
      <ul>
        <li>Elige el ticket que desees</li>
        <li>Realiza el depósito o transferencia</li>
        <li>Haz clic sobre el número de ticket deseado</li>
        <li>Adjunta el comprobante de pago con tus datos personales</li>
        <li>Si solo deseas reservar el número, puedes adjuntar tu pago al chat habilitado indicando tu nombre y número de teléfono</li>
      </ul>
    </div>
  </article>
  
  )
}

export default Prize