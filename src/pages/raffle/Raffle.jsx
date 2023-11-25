import React, { useState } from 'react';
import './raffle.scss'
//import Modal from 'react-modal';

const Raffle = () => {

    const [tickets, setTickets] = useState({});

  const handleTicketClick = (number) => {
    // Lógica para actualizar el estado de los tickets al hacer clic
    // Por ejemplo, puedes cambiar el estado de disponible a reservado aquí

    // Aquí mostraremos el modal con las opciones de pago y reserva
    // Puedes manejar esto utilizando el estado y funciones adicionales
  };
    return (
        <div>
            <h1>Tickets de Rifa</h1>
            <div className="ticket__container">
                {Array.from({ length: 1001 }, (_, index) => (
                    <div
                        key={index}
                        className={`ticket ${tickets[index] === 'disponible'
                                ? 'disponible'
                                : tickets[index] === 'reservado'
                                    ? 'reservado'
                                    : 'cancelado'
                            }`}
                        onClick={() => handleTicketClick(index)}
                    >
                        {index.toString().padStart(3, '0')}
                    </div>
                ))}
            </div>
           
        </div>
    )
}

export default Raffle