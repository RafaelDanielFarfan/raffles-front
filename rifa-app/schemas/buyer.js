// schema.js
export default {
    name: 'Buyer',
    type: 'document',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Nombre',
      },
      {
        name: 'lastname',
        type: 'string',
        title: 'Apellido',
      },
      {
        name: 'cellphone',
        type: 'string',
        title: 'Teléfono Celular',
      },
      {
        name: 'email',
        type: 'string',
        title: 'Correo Electrónico',
      },
      {
        name: 'imagePay',
        type: 'string',
        title: 'Imagen del Ticket',
      },
      {
        name: 'ticketId',
        type: 'string',
        title: 'Id del Ticket',
      }      
    ],
  };
  